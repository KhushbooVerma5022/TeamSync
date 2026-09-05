import mongoose from "mongoose";

type Member = {
    user: mongoose.Types.ObjectId,
    role: string
}

interface IProject {
    name: string;
    description: string;
    owner: mongoose.Types.ObjectId,
    members: Member[]
}

const ProjectSchema = new mongoose.Schema<IProject>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            role: {
                type: String,
                enum: ["owner", "admin", "member"]
            }
        }
    ]
})

const Project = mongoose.model<IProject>("Project", ProjectSchema)
export default Project;