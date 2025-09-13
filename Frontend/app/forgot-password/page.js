"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMsg(data.message || data.error || "If this email exists, a reset link was sent.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-pink-600 text-center">Forgot Password</h2>
        <p className="text-center text-gray-500 mt-2">Enter your email and we will send a reset link.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Your email" className="w-full px-4 py-3 border rounded-lg" required />
          <button className="w-full bg-pink-600 text-white py-3 rounded-lg">Send reset link</button>
        </form>

        {msg && <p className="mt-4 text-center text-sm text-gray-700">{msg}</p>}
      </div>
    </div>
  );
}
