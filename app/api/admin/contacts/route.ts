import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/lib/models/Contact';

// GET all contact submissions
export async function GET() {
    try {
        await connectToDatabase();
        // Sort by newest first
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: contacts });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
