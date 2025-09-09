"use client";

import { useEffect, useState } from "react";

export default function SeasonalPage() {
  const [creations, setCreations] = useState([]);

  useEffect(() => {
    // later we’ll replace with backend/localStorage fetch
    const dummy = [
      {
        id: 1,
        query: "Diwali night lights ✨",
        image: "https://via.placeholder.com/300x200?text=Diwali",
      },
      {
        id: 2,
        query: "Diamond bracelet 🌟",
        image: "https://via.placeholder.com/300x200?text=Bracelet",
      },
    ];
    setCreations(dummy);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 p-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-pink-600 mb-3">ARCHIVE</h1>
        <p className="text-pink-500 text-lg font-medium">
          Here you can explore all seasonal and fresh jewelry creations ✨
        </p>
      </div>

      {/* Creations Grid */}
      {creations.length === 0 ? (
        <p className="text-pink-400 text-center text-lg">
          No creations saved yet... 💎
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {creations.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-pink-200 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer group"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.query}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-pink-600/0 group-hover:bg-pink-600/20 rounded-t-2xl transition" />
              </div>

              {/* Details */}
              <div className="p-4">
                <p className="text-pink-600 font-semibold truncate">
                  {item.query}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Saved creation #{item.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
