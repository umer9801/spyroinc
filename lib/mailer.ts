import nodemailer from 'nodemailer';

export function getTransporter() {
    const user = process.env.MAIL_USERNAME;
    const pass = process.env.MAIL_PASSWORD;

    if (!user || !pass) {
        throw new Error("Email not configured. Check MAIL_USERNAME and MAIL_PASSWORD in .env.local");
    }

    const port = Number(process.env.MAIL_PORT) || 465;
    const useSecure = process.env.MAIL_ENCRYPTION === "ssl" || port === 465;

    return nodemailer.createTransport({
        host: process.env.MAIL_HOST || "smtp.gmail.com",
        port,
        secure: useSecure,
        auth: { user, pass },
    });
}
