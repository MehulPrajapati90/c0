import transporter from "../config/nodemailer.js";
import { createWelcomeEmailTemplate } from '../utils/email.template.js'

interface RegisterEmailProps {
    name: string;
    email: string;
}

const clientURL = process.env.CLIENT_URL || '';

export const sendResgisterWellcomeEmail = async ({ name, email }: RegisterEmailProps) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            replyTo: email,
            subject: "Welcome to C0 🎉",
            text: `You have successfully Registered to - C0`,
            html: createWelcomeEmailTemplate({ name, clientURL }),
        };

        // Send email
        const res = await transporter.sendMail(mailOptions);
    } catch (e) {
        throw new Error("Failer to send email" + e);
    }
};