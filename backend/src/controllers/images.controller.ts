import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../models/user.model";
import Image from "../models/image.model";
import * as fs from "fs";
import logging from "../lib/logging";
import Comment from "../models/comment.model";

const NAMESPACE = "Images Controller";

export const addImage: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!('username' in req.session)) return res.status(400).json({ 'message': 'User not logged in'});

    const username = req.session.username;
    const postingUser = await User.findOne({ username: username });

    if (!postingUser) return res.status(400).json({ 'message': 'Account not found'});

    const postedImage = await new Image({
        author: username,
        title: req.body.title,
        file: req.file
    });

    await postedImage.save();

    return res.status(201).json(postedImage);
};

export const deleteImage: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!('username' in req.session)) return res.status(401).json({ 'message': 'User not logged in'});

    const username = req.session.username;

    const user = await User.findOne({ username: username } );

    if (!user) return res.status(409).json({ 'message': 'User does not exist' });

    const imageId = req.params.imageId;
    const imageToDelete = await Image.findOne( { _id: imageId });

    if (!imageToDelete) return res.status(404).json({ 'message': `Image with id '${imageId}' not found` });

    if (imageToDelete.get('author') != username) return res
        .status(403)
        .json({ 'message': `User '${username}' is not authorized to delete this image`});

    try {
        await fs.promises.unlink(imageToDelete.get('file').path);
    } catch (err) {
        logging.error(NAMESPACE, 'Unable to remove file', err);
        return res.status(500).json({ 'message': 'Server could not unlink file' });
    }

    Comment.deleteMany({ imageId: imageId });  // Deleting all comments belonging to this image

    await Image.deleteOne({ _id: imageId });

    return res
        .status(200)
        .json({ 'message': `Image '${imageToDelete.get('title')}' posted by ${username} has been deleted`});
};

export const getImageWithId: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!('username' in req.session)) return res.status(401).json({ 'message': 'User not logged in'});

    const imageId = req.params.imageId;
    const image = await Image.findOne({ _id: imageId });

    if (!image) return res.status(404).json({ 'message': `Image with id '${imageId}' does not exist` });

    const fileOnly = req.query.file;
    if (fileOnly) {
        res.setHeader('Content-Type', image.get('file').mimetype);

        return res.status(200).sendFile(image.get('file').path, { root: './' });
    }

    return res.status(200).json(image);
}