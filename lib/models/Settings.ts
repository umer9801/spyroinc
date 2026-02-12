import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
    siteName: string;
    contactEmail: string;
    phoneNumber?: string;
    address?: string;
    socialLinks?: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
    };
    footerText?: string;
    serviceArea?: string;
    businessHours?: string;

}

const settingsSchema: Schema<ISettings> = new Schema(
    {
        siteName: {
            type: String,
            required: [true, "Site name is required"],
            default: "Spyro Inc",
        },
        contactEmail: {
            type: String,
            required: [true, "Contact email is required"],
        },
        phoneNumber: {type:String},
        address: {type: String },
        serviceArea: {type: String},
        businessHours: {type:String , default: "Mon-Fri 9AM-5PM"},
        socialLinks: {
            facebook: String,
            twitter: String,
            instagram: String,
            linkedin: String,
        },
        footerText: {type: String}
    },
    { timestamps: true }
);

const Settings: Model<ISettings> =
    mongoose.models.Settings || mongoose.model<ISettings>("Settings", settingsSchema);

export default Settings;
