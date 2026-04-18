import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Settings from '@/lib/models/Settings';

// GET settings
export async function GET() {
    try {
        await connectToDatabase();
        let settings = await Settings.findOne();

        // If no settings exist, create a default one
        if (!settings) {
            settings = await Settings.create({
                siteName: "Spyro Inc",
                contactEmail: process.env.ADMIN_EMAIL || "admin@example.com",
            });
        }

        return NextResponse.json({ success: true, data: settings });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}


// PUT update settings
export async function PUT(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        const settings = await Settings.findOneAndUpdate(
            {}, // Match any (usually only one exists)
            { $set: body },
            { new: true, upsert: true, runValidators: true }
        );

        return NextResponse.json({ success: true, data: settings });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

