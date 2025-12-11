import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

// Reusable transporter (Gmail + App Password)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.PASS, // your app password
  },
});

// -----------------------------
// Send OTP for Password Reset
// -----------------------------
export const sendOtpMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>Your OTP is: <b>${otp}</b></p>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    });

    console.log(`✅ Password reset OTP sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending password reset OTP:", err);
    throw err;
  }
};

// -----------------------------
// Send Delivery OTP
// -----------------------------
export const sendDeliveryOtpMail = async (user, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Delivery OTP",
      html: `
        <h2>Delivery Verification</h2>
        <p>Your delivery OTP is: <b>${otp}</b></p>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    });

    console.log(`✅ Delivery OTP sent to ${user.email}`);
  } catch (err) {
    console.error("❌ Error sending delivery OTP:", err);
    throw err;
  }
};
