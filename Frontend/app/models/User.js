// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // will be hashed with bcrypt
    provider: { type: String, default: "credentials" }, // e.g. google / credentials
  },
  { timestamps: true }
);

// Prevent recompilation in dev mode
export default mongoose.models.User || mongoose.model("User", UserSchema);
