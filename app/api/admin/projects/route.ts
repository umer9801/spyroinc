import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/lib/models/Project';

// GET all projects
export async function GET() {
    try {
        await connectToDatabase();
        const projects = await Project.find().sort({ order: 1 });
        return NextResponse.json({ success: true, data: projects });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// POST new project
export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const body = await req.json();

        if (!body.title || !body.description) {
            return NextResponse.json(
                { success: false, message: "Title and description are required" },
                { status: 400 }
            );
        }

        // Prepare project data with all fields including clientName and date
        const projectData = {
            title: body.title,
            description: body.description,
            category: body.category,
            clientName: body.clientName,
            date: body.date,
            status: body.status || 'pending',
            image: body.image,
            link: body.link,
            order: body.order || 0
        };

        const project = await Project.create(projectData);
        return NextResponse.json({ success: true, data: project }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
