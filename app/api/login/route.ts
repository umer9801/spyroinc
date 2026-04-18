
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/lib/models/Contact';
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


interface LoginDetails {
    email: string,
    password: string
}


function isLoginDetails(obj: any): obj is LoginDetails {
    return (
        obj !== null &&
        typeof obj === "object" &&
        typeof obj.email === "string" &&
        typeof obj.password === "string"

    );
}



const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH!; // pre-hashed

export async function validateAdminPassword(input: string) {
    return await bcrypt.compare(input, ADMIN_PASSWORD_HASH);
}


function validateEmail(input: string) {
    return
}

export async function POST(req: Request) {

    console.log("login route hit");
    try {
        await connectToDatabase();


        const body = await req.json();

        if (!isLoginDetails(body)) {
            return NextResponse.json({ success: false, message: "Invalid Login Details" },
                { status: 40 }
            )
        }


        const { email, password } = body;
        console.log("emial", email);
        console.log("passowrd" , password)
        // Validate
        if (!email?.trim() || !password?.trim()) {
            return NextResponse.json(
                { success: false, message: "Email or Password are missing" },
                { status: 400 }
            );
        }


        console.log("adminemal" , process.env.AUTH_ADMIN_EMAIL)
    

       
     if (email !== process.env.AUTH_ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ email: process.env.AUTH_ADMIN_EMAIL }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    const res = NextResponse.json({ success: true, message: 'Logged in' },{status: 200});
    res.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production', // only secure in prod

    });

    return res;





    } catch (error: any) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}