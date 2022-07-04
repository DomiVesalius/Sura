import { Document } from 'mongoose';

export default interface IComment extends Document {
    imageId: string;
    author: string;
    content: string;
}