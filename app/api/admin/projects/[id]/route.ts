import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/lib/models/Project';

// PUT update project
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const body = await req.json();

        // Prepare update data with all fields including clientName and date
        const updateData = {
            title: body.title,
            description: body.description,
            category: body.category,
            clientName: body.clientName,
            date: body.date,
            status: body.status,
            image: body.image,
            link: body.link,
            order: body.order
        };

        const project = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!project) {
            return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: project });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// DELETE project
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Project deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
