import IComment from "../interfaces/comment.interface";
import mongoose, { Schema } from 'mongoose';

const CommentSchema: Schema = new Schema(
    {
        author: { type: Schema.Types.String, ref: 'User', required: true },
        content: { type: Schema.Types.String, required: true },
        imageId: { type: Schema.Types.ObjectId, ref: 'Image', required: true}
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);

export default Comment