"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FreshCreationPage() {
  const [searchText, setSearchText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [savedChats, setSavedChats] = useState([]); // ✅ Added this
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleGenerate = () => {
    if (searchText || uploadedImage) {
      const newMessage = {
        id: Date.now(),
        type: "user",
        text: searchText || "Uploaded Fresh Creation",
        image:
          uploadedImage ||
          `https://via.placeholder.com/500x300?text=${encodeURIComponent(
            searchText
          )}`,
      };

      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        text: `Here’s your fresh creation: ${searchText || "Custom Upload"} 🌟`,
        image: newMessage.image,
      };

      const chatSession = {
        id: Date.now(),
        query: searchText || "Uploaded Fresh Creation",
        image: newMessage.image,
      };

      setMessages((prev) => [...prev, newMessage, botResponse]);
      setSavedChats((prev) => [chatSession, ...prev]); // ✅ Save creation in sidebar
      setSearchText("");
      setUploadedImage(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-white relative">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-72 bg-pink-50 border-r border-pink-200 p-4 flex flex-col transition-all duration-300">
          <div className="flex items-center justify-between mb-4 border-b border-pink-200 pb-2">
            <h2 className="text-xl font-bold text-pink-600">Fresh Creations</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-pink-500 hover:text-pink-700 transition"
            >
              ❌
            </button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4">
            {savedChats.length === 0 ? (
              <p className="text-pink-400 text-sm">No saved images yet...</p>
            ) : (
              savedChats.map((chat) => (
                <div
                  key={chat.id}
                  className="border border-pink-200 rounded-xl p-2 hover:shadow-md transition cursor-pointer hover:bg-pink-100"
                >
                  <img
                    src={chat.image}
                    alt={chat.query}
                    className="w-full h-28 object-cover rounded-lg"
                  />
                  <p className="text-xs mt-1 text-pink-600 truncate">
                    {chat.query}
                  </p>
                </div>
              ))
            )}
          </div>
        </aside>
      )}

      {/* Sidebar Open Button */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 bg-white text-pink-600 px-3 py-2 rounded-lg shadow-md border border-pink-200 hover:bg-pink-500 hover:text-white transition"
        >
          📂 Open Fresh
        </button>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="text-center py-6 border-b border-pink-200 bg-white shadow-sm">
          <h1 className="text-3xl font-extrabold text-pink-600">
            FRESH CREATION
          </h1>
          <p className="text-gray-700 text-lg font-medium">
            Discover and explore all your fresh jewelry creations here ✨
          </p>
        </header>

        {/* Chat Section */}
        <div className="flex-1 overflow-y-auto px-4 md:px-12 py-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-md p-4 rounded-2xl shadow-md ${
                  msg.type === "user"
                    ? "bg-gradient-to-r from-pink-400 to-pink-600 text-white"
                    : "bg-white border border-pink-200 text-pink-600"
                }`}
              >
                <p className="mb-2 font-medium">{msg.text}</p>
                {msg.image && (
                  <img
                    src={msg.image}
                    alt={msg.text}
                    className="rounded-xl mt-2 w-full max-h-64 object-cover shadow"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="sticky bottom-0 bg-white border-t border-pink-200 px-4 py-4 flex flex-col md:flex-row gap-3 items-center">
          <input
            type="text"
            placeholder="Describe a fresh creation... (e.g., Diamond bracelet ✨)"
            className="flex-1 p-3 rounded-2xl border border-pink-300 shadow-sm focus:ring-2 focus:ring-pink-400 outline-none text-pink-600"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <input
            type="file"
            onChange={handleUpload}
            className="p-2 rounded-xl border border-pink-300 cursor-pointer text-pink-600"
          />
          <button
            onClick={handleGenerate}
            className="bg-pink-500 text-white px-6 py-3 rounded-2xl hover:bg-pink-600 shadow-md transition transform hover:scale-105"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
