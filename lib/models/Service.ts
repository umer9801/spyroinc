import mongoose, { Schema, Document, Model } from "mongoose";

export interface IService extends Document {
    title: string;
    description: string;
    icon?: string;
    
}

const serviceSchema: Schema<IService> = new Schema(
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
        icon: {
            type: String,
            trim: true,
        },

    },
    { timestamps: true }
);

const Service: Model<IService> =
    mongoose.models.Service || mongoose.model<IService>("Service", serviceSchema);

export default Service;
