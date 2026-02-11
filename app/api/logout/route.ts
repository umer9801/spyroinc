import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    try {
        const cookieStore = await cookies();

        // Clear the token cookie
        cookieStore.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0), // Set to past date to delete
            path: '/',
        });

        return NextResponse.json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Logout failed"
        }, { status: 500 });
    }
}
