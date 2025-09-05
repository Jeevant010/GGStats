import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";

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

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-banner relative overflow-hidden w-full h-[500px] flex items-center justify-center bg-black">
      <AnimatePresence mode="wait">
        <Motion.img
          key={index}
          src={images[index]}
          alt={`Game ${index}`}
          className="absolute w-[80%] h-[80%] object-cover object-top rounded-2xl shadow-2xl"
          style={{ perspective: 1000 }} // adds depth
          initial={{ x: "100%", opacity: 0, scale: 0.8 }}
          animate={{ x: "0%", opacity: 1, scale: 1 }}
          exit={{ x: "-100%", opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black/80 to-transparent z-10"></div>

    </div>
  );
};

export default Hero;
