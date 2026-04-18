import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Service from '@/lib/models/Service';

// PUT update service
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const body = await req.json();

        const service = await Service.findByIdAndUpdate(id, body, { new: true, runValidators: true });

        if (!service) {
            return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: service });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// DELETE service
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const service = await Service.findByIdAndDelete(id);

        if (!service) {
            return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Service deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
