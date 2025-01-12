import nodemailer from 'nodemailer';
import { env } from '../config/env';

export async function sendOtpEmail({ workEmail, fullName, verificationCode }: { workEmail: string, fullName: string | null, verificationCode: string }) {
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: env.GOOGLE_EMAIL, 
                pass: env.GOOGLE_APP_PASSWORD,   
            },
        });

        
        const mailOptions = {
            from: env.GOOGLE_EMAIL,       
            to: workEmail,   
            subject: 'Your OTP to Verify Your Account - RIT Research Department', 
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border: 1px solid #dddddd; border-radius: 10px;">
                    <h2>Account Verification - RIT Research Department</h2>
                    <p>Dear <strong>${fullName ? fullName : workEmail}</strong>,</p>
                    <p>Greetings from the RIT Research Department!</p>
                    <p>Your One-Time Password (OTP) for account verification is:</p>
                    <p style="font-size: 1.5em; color: #ff5722; font-weight: bold;">${verificationCode}</p>
                    <p>This OTP is valid for <strong>30 minutes</strong>. Please do not share it with anyone.</p>
                    <p>If you did not request this OTP, please contact our support team immediately.</p>
                    <p>Thank you for being a part of the RIT Research community.</p>
                    <div style="margin-top: 20px; font-size: 0.9em; color: #888;">
                        <p>Warm regards,</p>
                        <p>RIT Research Department</p>
                        <p>Email: <a href="mailto:${env.GOOGLE_EMAIL}">${env.GOOGLE_EMAIL}</a></p>
                        <p>Phone: +00 0000000000</p>
                    </div>
                </div>
            `,
        };

        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
