import mongoose from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    isVerified?: boolean;
}

const UserSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true
}
)

const User = mongoose.model<IUser>('User', UserSchema);
export default User;