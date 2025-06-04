import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { env } from 'process';


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgetPasswordToken: hashedToken,
                forgetPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS 
            }
        });

        const mailOptions = {
            from: 'mihirmehrajio@gmail.com', // Corrected email domain
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <p>Hello,</p>
                <p>${emailType === "VERIFY" ? "Please verify your email by clicking the link below:" : "You can reset your password using the link below:"}</p>
                <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashedToken}">${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}</a>
                <p>This link will expire in one hour.</p>
                <p>Thank you!</p>
            `
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        console.error("Error sending email:", error.message);
        throw new Error("Failed to send email");
    }
}
