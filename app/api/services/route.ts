import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Service from '@/lib/models/Service';

export async function GET() {
    try {
        await connectToDatabase();
        const services = await Service.find().sort({ order: 1 });
        return NextResponse.json({ success: true, data: services });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
