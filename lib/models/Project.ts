import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
    title: string;
    description: string;
    image?: string;
    link?: string;
    category?: string;
    clientName?: string;
    date?: Date;
    status?: 'pending' | 'under process' | 'completed';
    order: number;
}

const projectSchema: Schema<IProject> = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        link: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            trim: true,
        },
        clientName: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
        },
        status: {
            type: String,
            enum: ['pending', 'under process', 'completed'],
            default: 'pending',
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
