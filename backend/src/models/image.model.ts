import IImage from "../interfaces/image.interface";
import mongoose, { Schema } from 'mongoose';

const ImageSchema: Schema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: Schema.Types.String, required: true },
        file: { type: Object, required: true }
    },
    {
        timestamps: true
    }
);

const Image = mongoose.model<IImage>('Image', ImageSchema);

export default Image;