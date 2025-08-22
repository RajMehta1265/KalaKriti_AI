"use client";
import { FaInstagram, FaPinterest, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-white pt-12 pb-6 mt-16">
      {/* Top Border */}
      <div className="border-t-4 border-[#ff007f] mb-8"></div>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-10 px-6">
        {/* Brand + Socials */}
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-[#ff007f] text-2xl font-bold mb-3">KALAKRITI AI</h2>
          <p className="text-gray-400 max-w-xs mb-5">
            Crafting Tomorrow’s Jewelry, Preserving Yesterday’s Charm.
          </p>
          <div className="flex gap-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"
              className="text-[#ff007f] text-2xl hover:text-white transition-colors">
              <FaInstagram />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer"
              className="text-[#ff007f] text-2xl hover:text-white transition-colors">
              <FaPinterest />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer"
              className="text-[#ff007f] text-2xl hover:text-white transition-colors">
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "Seasonal", "Fresh Creations", "Design Archive", "Store", "About"].map((link, idx) => (
              <li key={idx}>
                <a href="#" className="text-gray-400 hover:text-[#ff007f] transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[220px]">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-400 flex items-center gap-2 mb-2">
            <FaEnvelope /> support@kalakriti.ai
          </p>
          <p className="text-gray-400 flex items-center gap-2">
            <FaPhone /> +91 98765 43210
          </p>
        </div>

        {/* Newsletter */}
        <div className="flex-[1.5] min-w-[280px]">
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400">Subscribe for the latest seasonal jewelry drops.</p>
          <form className="flex mt-4 max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 flex-1 rounded-l-full outline-none text-white"
            />
            <button
              type="submit"
              className="px-6 bg-[#ff007f] text-white font-bold rounded-r-full hover:bg-white hover:text-[#ff007f] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center border-t border-gray-700 mt-10 pt-6 text-gray-500 text-sm">
        © 2025 Mehta Raj. All Rights Reserved.
      </div>
    </footer>
  );
}
