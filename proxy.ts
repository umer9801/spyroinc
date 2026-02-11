import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Paths that require authentication
// const protectedPaths = ['/admin', '/api/admin'];

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;
   if (pathname === '/login') {
        return NextResponse.next();
    }

    const token = req.cookies.get('token')?.value;

    // Only protect /admin routes (matcher already ensures this)
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        jwt.verify(token, JWT_SECRET);
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/admin/:path*'],
};