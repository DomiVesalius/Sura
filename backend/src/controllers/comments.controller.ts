import { Request, Response, NextFunction, RequestHandler } from "express";
import logging from "../lib/logging";
import Image from "../models/image.model";
import Comment from "../models/comment.model";

const NAMESPACE = 'Comments Controller';

export const addComment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!('username' in req.session)) return res.status(400).json({ 'message': 'User not logged in'});

    // Checking if the logged-in user exists
    const username = req.session.username;
    const commentingUser = await Image.findOne({ username: username });
    if (!commentingUser) return res.status(400).json({ 'message': 'Account not found'});

    const imageId = req.params.imageId;

    // Checking if the image exists
    const imageToCommentOn = await Image.findOne({ _id: imageId });
    if (!imageToCommentOn) return res.status(404).json({ 'message': `Image with id ${imageId} not found` });

    const content = req.body.content;
    await new Comment({
        author: username,
        content: content,
        imageId: imageToCommentOn.get('id')
    }).save();

    return res.status(201).json(imageToCommentOn);
};

export const deleteComment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {};

export const getComments: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {};
