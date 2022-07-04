import IComment from "../interfaces/comment.interface";
import mongoose, { Schema } from 'mongoose';

const CommentSchema: Schema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: Schema.Types.String, required: true },
        image: { type: Schema.Types.ObjectId, ref: 'Image' }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IComment>('Comment', CommentSchema);