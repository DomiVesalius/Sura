import { Request, Response, NextFunction, RequestHandler } from "express";
import User from "../models/user.model";
import Image from "../models/image.model";

const NAMESPACE = "Images Controller";

export const addImage: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!('username' in req.session)) return res.status(400).json({ 'message': 'User not logged in'});

    const username = req.session.username;
    const postingUser = await User.findOne({ username: username });

    if (!postingUser) return res.status(400).json({ 'message': 'Account not found'});

    const postedImage = await new Image({
        author: postingUser.get('id'),
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

    if (imageToDelete.get('author') != user.get('id')) return res
        .status(403)
        .json({ 'message': `User '${username}' is not authorized to delete this image`});

    await Image.deleteOne({ _id: imageId });

    return res
        .status(200)
        .json({ 'message': `Image '${imageToDelete.get('title')}' posted by ${username} has been deleted`});
};
