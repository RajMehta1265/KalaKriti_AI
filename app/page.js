"use client"

import { useState, useEffect, useRef } from "react";

const images = [
  { src: "/logo.png", label: "seasonal" },
  { src: "/file.svg", label: "fresh" },
  { src: "/globe.svg", label: "archive" },
  { src: "/next.svg", label: "fresh" },
  { src: "/window.svg", label: "archive" },
];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timeoutRef.current);
  }, []);

  // Reset transition for immediate jump when looping back to first image
  useEffect(() => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      // Re-enable transition after a tick
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <div className="text-center text-xl font-semibold text-pink-600">
        from {images[currentIndex].label}
      </div>

      <div className="relative w-96 h-64 overflow-hidden rounded-md shadow-lg">
        {images.map((img, idx) => {
          const isActive = idx === currentIndex;
          const isPrev = idx === (currentIndex - 1 + images.length) % images.length;

          return (
            <img
              key={idx}
              src={img.src}
              alt={`${img.label} jewelry ${idx + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover`}
              style={{
                transition: isTransitioning ? "transform 0.7s ease-in-out" : "none",
                transform: isActive
                  ? "translateX(0)"
                  : isPrev
                  ? "-100%"
                  : "100%",
                opacity: isActive ? 1 : 0,
                zIndex: isActive ? 10 : 0,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
