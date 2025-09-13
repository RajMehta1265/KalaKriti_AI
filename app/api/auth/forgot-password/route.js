// app/api/auth/forgot-password/route.js
import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";

import nodemailer from "nodemailer";

async function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback: Ethereal (dev only)
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "kalakriti");

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      // don't reveal whether email exists — return success message
      return NextResponse.json({ message: "If this email exists, a reset link will be sent." });
    }

    // generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 1000 * 60 * 60; // 1 hour

    await db.collection("users").updateOne(
      { _id: user._id },
      { $set: { resetToken: token, resetTokenExpiry: expiry } }
    );

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    const transporter = await createTransporter();
    const html = `
      <p>Hi ${user.name || ""},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetUrl}">Reset password</a></p>
      <p>This link will expire in 1 hour.</p>
    `;

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "no-reply@kalakriti.ai",
      to: email,
      subject: "Kalakriti: Password reset",
      html,
    });

    // If using Ethereal, log the preview URL
    if (!process.env.SMTP_HOST) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    return NextResponse.json({ message: "If this email exists, a reset link will be sent." });
  } catch (err) {
    console.error("FORGOT PW ERR", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
