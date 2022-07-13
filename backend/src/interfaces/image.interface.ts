import { Document } from 'mongoose';

export default interface IImage extends Document {
    author: string;
    title: string;
    file: object;
}
