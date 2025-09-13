"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const search = useSearchParams();
  const token = search.get("token");
  const router = useRouter();

  const handle = async (e) => {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.error || "Failed");
      return;
    }
    setMsg("Password reset. Redirecting to login...");
    setTimeout(()=> router.push("/login"), 1400);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-pink-600 text-center">Reset Password</h2>
        <form onSubmit={handle} className="mt-6 space-y-4">
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="New password" className="w-full px-4 py-3 border rounded-lg" required />
          <button className="w-full bg-pink-600 text-white py-3 rounded-lg">Set new password</button>
        </form>
        {msg && <p className="mt-4 text-center text-sm">{msg}</p>}
      </div>
    </div>
  );
}
