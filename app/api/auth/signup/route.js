"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setErr(data.error || "Signup failed");
      return;
    }

    // Option A: auto-login right after signup
    await signIn("credentials", { email, password, callbackUrl: "/" });
    // Option B: router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-pink-600">Create account</h2>
        <p className="text-center text-gray-500 mt-2 text-sm">Sign up to start saving designs</p>

        {err && <div className="text-red-500 text-sm mt-3">{err}</div>}

        <form onSubmit={handleSignup} className="mt-6 space-y-4">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 border rounded-lg" required />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-4 py-3 border rounded-lg" required />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-3 border rounded-lg" required />

          <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-lg">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
