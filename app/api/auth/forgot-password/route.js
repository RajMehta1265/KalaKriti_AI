import { NextResponse } from "next/server";
import crypto from "crypto";

// Imagine you have a User model (MongoDB)
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const { email } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    // TODO: send email with Nodemailer
    // Example reset link:
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    console.log("RESET LINK:", resetLink);

    return NextResponse.json({ message: "Reset link sent to your email" });
  } catch (err) {
    return NextResponse.json({ message: "Error occurred" }, { status: 500 });
  }
}
