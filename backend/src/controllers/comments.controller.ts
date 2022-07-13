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

export const deleteComment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!('username' in req.session)) return res.status(400).json({ 'message': 'User not logged in'});
    // Checking if the logged-in user exists
    const username = req.session.username;
    const commentingUser = await Image.findOne({ username: username });
    if (!commentingUser) return res.status(400).json({ 'message': 'Account not found'});

    const { imageId, commentId } = req.params;
    const image = await Image.findOne({ _id: imageId });
    const comment = await Comment.findOne({ _id: commentId });

    if (!image) return res.status(404).json({ 'message': `Image with id ${imageId} not found`});
    if (!comment) return res.status(404).json({ 'message': `Comment with id ${commentId} not found`});

    // Checking if the logged-in user is deleting their own comment or a comment on their own gallery
    if (image.get('author') === username || comment.get('author') === username) {
        Comment.deleteOne({ _id: commentId });
        return res.status(200).json({ 'message': `Comment with id ${commentId} successfully deleted` });
    } else {
        return res
            .status(403)
            .json({ 'message': `User ${username} is not authorized to delete the comment with id ${commentId}` });
    }

};

/**
 * Sends a response containing the <limit> most recent comments
 * Query parameters:
 *      - limit; An integer representing the number of comments being requests
 *      - next_item_date (Optional); The timestamp
 *      Used for cursor-based pagination
 *          - If not provided, the <limit> most recent comments are returned
 */
export const getComments: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const imageId = req.params.imageId;

    const image = await Image.findOne({ _id: imageId });
    if (!image) return res.status(404).json({ 'message': `Image with id ${imageId} not found`});

    const limit = parseInt(`${req.query.limit}`) || 10;  // Default of 10 if limit not provided
    let next_item_date = req.query.next_item_date;

    let comments;
    if (!next_item_date) {
        comments = await Comment.find({ imageId: imageId })
            .sort('-createdAt')  // Sort by most recent
            .limit(limit);
    } else {
        comments = await Comment.find({
            imageId: imageId,
            createdAt: { $lt: next_item_date }
        }).sort('-createdAt').limit(limit);
    }

    if (comments.length > 0){
        next_item_date = comments[comments.length - 1].get('createdAt');
    } else {
        next_item_date = '';
    }

    return res.status(200).json({
        items: comments,
        next_item_id: next_item_date
    });

};
