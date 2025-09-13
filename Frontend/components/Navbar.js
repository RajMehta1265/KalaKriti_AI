"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut, User, Search } from "lucide-react";
import { useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "Seasonal", href: "/seasonal" },
  { name: "Fresh Creations", href: "/fresh" },
  { name: "Design Archive", href: "/archive" },
  { name: "Store", href: "/store" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Left - Logo */}
        <div className="text-3xl font-bold text-pink-600">
          <Link href="/">Kalakriti AI</Link>
        </div>

        {/* Middle - Nav Links */}
        <div className="hidden md:flex space-x-6">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-pink-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right - Search + Auth */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-full px-3 py-1 outline-none focus:ring-2 focus:ring-pink-400"
                onBlur={() => setSearchOpen(false)}
                autoFocus
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
            )}
          </div>

          {/* Auth Section */}
          {!session ? (
            <button
              onClick={() => signIn()}
              className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
              title="Login"
            >
              <LogIn className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              {/* User Name + Icon */}
              <div className="flex items-center space-x-1 text-gray-700">
                <User className="w-5 h-5 text-pink-600" />
                <span>{session.user?.name || "User"}</span>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
