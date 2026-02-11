import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/lib/models/Contact';
import nodemailer from 'nodemailer';
import { getAdminEmailHtml, getUserConfirmationEmailHtml, ContactPayload } from '@/lib/emailTemplates';
import { getTransporter } from '@/lib/mailer';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "spyro.reno@gmail.com";

interface ContactBody {
    name: string;
    email: string;
    phone: string;
    message: string;
    service: string;
}

// Type guard function
function isContactBody(obj: any): obj is ContactBody {
    return (
        obj !== null &&
        typeof obj === "object" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string" &&
        typeof obj.phone === "string" &&
        typeof obj.message === "string" &&
        typeof obj.service === "string"
    );
}

export async function POST(req: Request) {

    console.log("Get contact route hit");
    try {
        await connectToDatabase();

        const body = await req.json();


        if (!isContactBody(body)) {
            return NextResponse.json(
                { success: false, message: "Invalid contact payload" },
                { status: 400 }
            );
        }

        const { name, email, phone, message, service } = body;

        // Validate
        if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim() || !service?.trim()) {
            return NextResponse.json(
                { success: false, message: "Name, email, phone, service and message are required." },
                { status: 400 }
            );
        }

        const payload: ContactPayload = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            service: service.trim(),
            message: message.trim(),
        };

        // Save to DB
        const contact = await Contact.create(payload);

        // Send Emails
        const transporter = getTransporter();
        const fromName = process.env.MAIL_FROM_NAME || "Contact Form";
        const fromAddress = process.env.MAIL_FROM_ADDRESS || process.env.MAIL_USERNAME;
        const from = `"${fromName}" <${fromAddress}>`;

        try {
            // Admin Email
            await transporter.sendMail({
                from,
                to: ADMIN_EMAIL,
                subject: `New contact from ${payload.name} (${payload.email})`,
                html: getAdminEmailHtml(payload),
            });

            // User Email
            await transporter.sendMail({
                from,
                to: payload.email,
                subject: "We received your message – Request submitted",
                html: getUserConfirmationEmailHtml(payload),
            });
        } catch (emailErr: any) {
            return NextResponse.json({
                success: true,
                message: "Contact saved but email sending failed.",
                emailError: emailErr.message,
                id: contact._id
            }, { status: 201 });
        }

        return NextResponse.json({
            success: true,
            message: "Contact saved and emails sent to admin and submitter.",
            id: contact._id,
        }, { status: 201 });

    } catch (error: any) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
