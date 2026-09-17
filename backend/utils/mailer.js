const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, code) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email credentials are not configured in .env');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        
        await transporter.sendMail({
            from: `"Lanka E-Learning Platform" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify Your Email Address",
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h2>Welcome to the E-Learning Platform!</h2>
                    <p>Use the following 6-digit code to verify your email address:</p>
                    <h1 style="background: #f0f7ff; color: #0284c7; padding: 15px; border-radius: 8px; display: inline-block; letter-spacing: 5px;">${code}</h1>
                    <p style="color: #64748b; font-size: 13px; marginTop: 20px;">If you didn't request this, you can ignore this email.</p>
                </div>
            `
        });
        console.log(`[SMTP] Verification email successfully sent to ${email}`);
    } catch (error) {
        console.error("Email sending failed:", error);
    }
};

module.exports = { sendVerificationEmail };
