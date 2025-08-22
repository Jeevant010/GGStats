import React, { useRef, useEffect } from 'react';
import footballVideo from '../../assets/football.mp4';

export const UpcomingEvents = () => {
  const videoRef = useRef(null);
//   const maskRef = useRef(null);

  useEffect(() => {
    // Sync video playback with mask
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
  <>
    <h1 className="flex text-4xl md:text-5xl font-extrabold bg-black bg-clip-text text-transparent 
  drop-shadow-lg tracking-wider">
  COMING...
</h1>

    <div className="relative flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-full max-w-[1200px] aspect-[2.4/1] flex items-center justify-center mx-auto">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 545"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="text-mask" maskUnits="userSpaceOnUse">
              <rect width="1200" height="545" fill="black" />
              <text
                x="50%"
                y="44%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="320"
                fontWeight="bold"
                fontFamily="'Arial Black', Impact, Arial, sans-serif"
                letterSpacing="-10"
                fill="white"
                style={{ textTransform: 'uppercase' }}
              >
                2026
              </text>
              <text
                x="75%"
                y="68%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="70"
                fontWeight="bold"
                fontFamily="'Arial Black', Impact, Arial, sans-serif"
                fill="white"
                style={{ textTransform: 'uppercase' }}
              >
                FIFA
              </text>
              <text
                x="50%"
                y="80%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="85"
                fontWeight="bold"
                fontFamily="'Arial Black', Impact, Arial, sans-serif"
                fill="white"
                style={{ textTransform: 'uppercase' }}
              >
                NEW YORK NEW JERSEY
              </text>
            </mask>
          </defs>
          <rect width="1200" height="545" fill="white" />
        </svg>
        {/* Video masked by SVG text */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={footballVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            mask: 'url(#text-mask)',
            WebkitMask: 'url(#text-mask)',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskSize: 'cover',
            WebkitMaskSize: 'cover',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            background: 'white',
          }}
        />
      </div>
    </div>
    </>
  );
}
  

