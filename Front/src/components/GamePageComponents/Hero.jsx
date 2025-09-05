import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react"; // A popular icon library

// Your image array
const images = [
  "/game4.jpg",
  "/game2.jpg",
  "/game3.jpg",
  "/game1.jpg",
  "/game5.jpg",
  "/game6.jpg",
  "/val2.jpg",
  "/omen1.png",
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const numImages = images.length;

  // Function to handle next slide
  const handleNext = () => {
    setIndex((prev) => (prev + 1) % numImages);
  };

  // Function to handle previous slide
  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + numImages) % numImages);
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="hero-banner relative overflow-hidden w-full h-[500px] flex items-center justify-center bg-black">
      {/* Motion container for all images */}
      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((image, i) => {
          // Calculate the raw position
          let position = i - index;

          // ✨ CORE LOGIC FOR CIRCULAR LOOP ✨
          // If an image is more than halfway around the loop in one direction,
          // treat it as being on the other side for a shorter transition.
          if (position > numImages / 2) {
            position -= numImages;
          } else if (position < -numImages / 2) {
            position += numImages;
          }

          const isCenter = position === 0;
          
          // Determine x offset based on the adjusted position
          const xOffset = position * 40;

          // Determine scale and opacity for depth effect
          const scale = isCenter ? 1 : 0.7;
          const opacity = Math.abs(position) > 1 ? 0 : (isCenter ? 1 : 0.5);

          return (
            <Motion.img
              key={image} // Use a unique and stable key
              src={image}
              alt={`Game slide ${i + 1}`}
              className="absolute w-[70%] h-[80%] object-cover object-top rounded-2xl shadow-2xl"
              animate={{
                x: `${xOffset}%`,
                scale: scale,
                opacity: opacity,
                zIndex: numImages - Math.abs(position), // Center image has highest z-index
              }}
              // Add a simple initial animation for the first load
              initial={false}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          );
        })}
      </div>

      {/* Gradient Overlays for Fading Effect on Sides */}
      <div className="absolute left-0 top-0 h-full w-48 bg-gradient-to-r from-black via-black/50 to-transparent z-20"></div>
      <div className="absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-black via-black/50 to-transparent z-20"></div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === i ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;