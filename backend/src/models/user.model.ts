import IUser from "../interfaces/user.interface";
import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
    {
        username: { type: Schema.Types.String, required: true, unique: true },
        password: { type: Schema.Types.String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>('User', UserSchema);