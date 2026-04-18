import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/lib/models/Contact';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;

        console.log(`Attempting to delete message: ${id}`);
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Message deleted successfully" });
    } catch (error: any) {
        console.error("DELETE Message Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const body = await request.json();

        console.log(`Updating message ${id} status to: ${body.status}`);

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { status: body.status },
            { new: true }
        );

        if (!updatedContact) {
            return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedContact });
    } catch (error: any) {
        console.error("PATCH Message Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
