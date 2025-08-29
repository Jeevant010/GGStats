import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/3dcharacter1.png",
  "/3dcharacter1.png",
  "/3dcharacter1.png",
  "/3dcharacter1.png",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-banner relative overflow-hidden w-full h-[500px] flex items-center justify-center bg-black">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Game ${index}`}
          className="absolute w-[80%] h-[80%] object-cover rounded-2xl shadow-2xl"
          style={{ perspective: 1000 }} // adds depth
          initial={{ opacity: 0, rotateY: 0, scale: 0.8 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 0, scale: 0.8 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black/80 to-transparent z-10"></div>

    </div>
  );
};

export default Hero;
