import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config()
const { EMAIL_SENDER, EMAIL_PASS } = process.env

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_SENDER,
        pass: EMAIL_PASS,
    }
});

// Send email
export async function sendEmail(toEmail: string, subject: string, message: string,  isHtml: boolean = false): Promise<void> {
    try {
        await transporter.sendMail({
            from: EMAIL_SENDER,
            to: toEmail,
            subject,
            ...(isHtml ? { html: message } : { text: message }),
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error sending email: ' + error.message);
        } else {
            throw new Error('Error sending email');
        }
    }
}
