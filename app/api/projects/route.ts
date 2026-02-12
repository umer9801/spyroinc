import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/lib/models/Project';

export async function GET() {
    try {
        await connectToDatabase();
        const projects = await Project.find().sort({ order: 1 });
        return NextResponse.json({ success: true, data: projects });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
