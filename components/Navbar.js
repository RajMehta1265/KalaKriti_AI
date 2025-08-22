"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* ✅ SVG Logo */}
        <div className="flex items-center gap-2">
          <svg
            width="40"
            height="40"
            viewBox="0 0 346.612196203725 369.9004891633874"
            className="looka-1j8o68f"
          >
            {/* keep the rest of your SVG <path> etc. here */}
          </svg>
          <span className="text-3xl font-bold text-pink-600">KALAKRITI AI</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {[
            { name: "Home", href: "/" },
            { name: "Seasonal", href: "/seasonal" },
            { name: "Fresh Creations", href: "/fresh" },
            { name: "Design Archive", href: "/archive" },
            { name: "Store", href: "/store" },
            { name: "About", href: "/about" },
          ].map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className="relative hover:text-pink-600 transition-colors duration-200 
                  after:content-[''] after:absolute after:-bottom-1 after:left-0 
                  after:w-0 after:h-[2px] after:bg-pink-600 
                  hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search + Login */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center border rounded-lg px-3 py-1 bg-gray-50">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search earrings, rings..."
              className="ml-2 bg-transparent outline-none text-sm"
            />
          </div>
          <Link href="/login">
            <button className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}
