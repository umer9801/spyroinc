import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
    name: string;
    email: string;
    phone: string;
    service: string
    message: string;
    createdAt: Date;
}

const contactSchema: Schema<IContact> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        service: {
            type :String,
            required: [true, "Services are required"],
            trim: true
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
        },
    },
    { timestamps: true }
);

const Contact: Model<IContact> =
    mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
