import React, { useState, useEffect, useCallback } from "react";
import { motion as Motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev + 1) % numImages);
  }, [numImages]);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev - 1 + numImages) % numImages);
  }, [numImages]);

  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="relative overflow-hidden w-full h-[400px] md:h-[500px] flex items-center justify-center bg-surface-900">
      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((image, i) => {
          let position = i - index;
          if (position > numImages / 2) position -= numImages;
          else if (position < -numImages / 2) position += numImages;

          const isCenter = position === 0;
          const xOffset = position * 40;
          const scale = isCenter ? 1 : 0.7;
          const opacity = Math.abs(position) > 1 ? 0 : (isCenter ? 1 : 0.5);

          return (
            <Motion.img
              key={image}
              src={image}
              alt={`Game slide ${i + 1}`}
              className="absolute w-[70%] h-[80%] object-cover object-top rounded-2xl shadow-2xl"
              animate={{
                x: `${xOffset}%`,
                scale,
                opacity,
                zIndex: numImages - Math.abs(position),
              }}
              initial={false}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          );
        })}
      </div>

      {/* Side Fades */}
      <div className="absolute left-0 top-0 h-full w-48 bg-gradient-to-r from-surface-900 via-surface-900/50 to-transparent z-20" />
      <div className="absolute right-0 top-0 h-full w-48 bg-gradient-to-l from-surface-900 via-surface-900/50 to-transparent z-20" />

      {/* Nav Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 glass rounded-full text-gray-400 hover:text-white transition-colors"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 glass rounded-full text-gray-400 hover:text-white transition-colors"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === i ? "bg-accent w-6" : "bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;