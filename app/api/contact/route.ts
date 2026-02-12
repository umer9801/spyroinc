import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Contact from '@/lib/models/Contact';
import nodemailer from 'nodemailer';
import { getAdminEmailHtml, getUserConfirmationEmailHtml, ContactPayload } from '@/lib/emailTemplates';
import { getTransporter } from '@/lib/mailer';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "spyro.reno@gmail.com";

// Common email providers for typo detection
const COMMON_PROVIDERS = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
    'icloud.com', 'aol.com', 'protonmail.com', 'live.com',
    'msn.com', 'ymail.com', 'mail.com'
];

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

// Levenshtein distance for typo detection
function levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}

// Check for email provider typos
function checkEmailTypo(email: string): { isTypo: boolean; suggestion?: string } {
    const domain = email.split('@')[1];
    if (!domain) return { isTypo: false };

    // If it's already a common provider, no typo
    if (COMMON_PROVIDERS.includes(domain)) {
        return { isTypo: false };
    }

    // Check for similar providers (distance <= 2 for typos like gamil, yahooo)
    for (const provider of COMMON_PROVIDERS) {
        const distance = levenshteinDistance(domain, provider);
        if (distance > 0 && distance <= 2) {
            return {
                isTypo: true,
                suggestion: email.split('@')[0] + '@' + provider
            };
        }
    }

    return { isTypo: false };
}

// Phone number validation and normalization
function validateAndNormalizePhone(phone: string): { isValid: boolean; normalized?: string; message?: string } {
    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');

    // Check if empty
    if (!digitsOnly) {
        return {
            isValid: false,
            message: "Phone number cannot be empty."
        };
    }

    // North American format (USA/Canada): 10 digits or 11 with country code (1)
    if (digitsOnly.length === 10) {
        // Format: (XXX) XXX-XXXX
        const normalized = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
        return { isValid: true, normalized };
    }

    if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
        // Format: +1 (XXX) XXX-XXXX
        const normalized = `+1 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`;
        return { isValid: true, normalized };
    }

    // International format: 7-15 digits (excluding North American)
    if (digitsOnly.length >= 7 && digitsOnly.length <= 15) {
        // Keep the original format with + if it had one
        const normalized = phone.trim().startsWith('+') ? phone.trim() : `+${digitsOnly}`;
        return { isValid: true, normalized };
    }

    // Invalid length
    return {
        isValid: false,
        message: "Invalid phone number. Please provide a valid phone number (10 digits for US/Canada, or international format with country code)."
    };
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

        // Validate basic presence
        if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim() || !service?.trim()) {
            return NextResponse.json(
                { success: false, message: "Name, email, phone, service and message are required." },
                { status: 400 }
            );
        }

        // Email Validation & Normalization
        const normalizedEmail = email.trim().toLowerCase();
        // Regex ensures: valid characters, @ symbol, domain with letters (not just numbers), and alphabetic TLD
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

        // Additional check: domain part must contain at least one letter (reject purely numeric domains like 333.com)
        const domainPart = normalizedEmail.split('@')[1];
        const hasLetterInDomain = domainPart && /[a-zA-Z]/.test(domainPart.split('.')[0]);

        if (!normalizedEmail || !emailRegex.test(normalizedEmail) || !hasLetterInDomain) {
            return NextResponse.json(
                { success: false, message: "Invalid email format. Please provide a properly formatted email address." },
                { status: 400 }
            );
        }

        // Check for common email provider typos
        const typoCheck = checkEmailTypo(normalizedEmail);
        if (typoCheck.isTypo && typoCheck.suggestion) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Did you mean ${typoCheck.suggestion}? Please check your email address.`
                },
                { status: 400 }
            );
        }


        // Phone Number Validation & Normalization
        const phoneValidation = validateAndNormalizePhone(phone);
        if (!phoneValidation.isValid) {
            return NextResponse.json(
                { success: false, message: phoneValidation.message || "Invalid phone number." },
                { status: 400 }
            );
        }

        const payload: ContactPayload = {
            name: name.trim(),
            email: normalizedEmail,
            phone: phoneValidation.normalized || phone.trim(),
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
