import React, { useRef, useEffect } from 'react';
import { CalendarDays, MapPin, Trophy } from 'lucide-react';
import footballVideo from '../../assets/football.mp4';

export const UpcomingEvents = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <section className="py-10 px-4 lg:px-6 max-w-[1400px] mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <CalendarDays size={22} className="text-accent" />
        <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
      </div>

      {/* Video Masked Text */}
      <div className="relative flex items-center justify-center rounded-2xl overflow-hidden glass min-h-[300px] md:min-h-[500px]">
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
                  fontWeight="900"
                  fontFamily="'Inter', 'Helvetica Neue', sans-serif"
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
                  fontWeight="900"
                  fontFamily="'Inter', Arial, sans-serif"
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
                  fontWeight="900"
                  fontFamily="'Inter', Arial, sans-serif"
                  fill="white"
                  style={{ textTransform: 'uppercase' }}
                >
                  WORLD CUP
                </text>
              </mask>
            </defs>
            <rect width="1200" height="545" fill="transparent" />
          </svg>
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
            }}
          />
        </div>

        {/* Event Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-surface-900/90 to-transparent">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 max-w-[1200px] mx-auto">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-upcoming" />
              <span className="text-white text-sm font-semibold">FIFA World Cup 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <MapPin size={14} />
              <span>USA, Canada, Mexico</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
