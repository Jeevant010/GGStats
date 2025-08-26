import React, { useEffect } from 'react'
import gsap from 'gsap';

const GsapText = () => {
    useEffect(() => {
        gsap.fromTo('.cards', {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                delay: .5,
                stagger: 0.2,
            })
    }, [])
    return null;
}

const Hero = () => {
  return (
    <>
      <GsapText />
      <div className="flex flex-col w-full mt-6">
        <div className="cards flex flex-col md:flex-row w-full max-w-full mx-auto gap-6 px-2 mt-0">
          {/* Left Cards */}
          <div className="flex flex-col gap-4 w-full md:w-1/4 order-2 md:order-1 mt-4 md:mt-0 ">
            <div className="bg-white/80 rounded-xl shadow-lg p-4 min-h-[120px] flex flex-col items-center justify-center">
              <span className="font-bold text-lg text-gray-800">Live Scores</span>
              <ul className="mt-2 text-sm text-gray-600">
                <li>1</li>
                <li>2</li>
                <li>3</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl shadow-lg p-4 min-h-[120px] flex flex-col items-center justify-center">
              <span className="font-bold text-lg text-gray-800">Upcoming Matches</span>
              <ul className="mt-2 text-sm text-gray-600">
                <li>Match1</li>
                <li>Match2</li>
              </ul>
            </div>
             <div className="bg-white/80 rounded-xl shadow-lg p-4 min-h-[120px] flex flex-col items-center justify-center">
              <span className="font-bold text-lg text-gray-800">Upcoming Matches</span>
              <ul className="mt-2 text-sm text-gray-600">
                <li>Match1</li>
                <li>Match2</li>
              </ul>
            </div>
          </div>

          {/* Center Video */}
          <div className="flex-1 flex flex-col items-center justify-center order-1 md:order-2">
            <div className="aspect-video w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white/60 bg-black">
              <video
                className="w-full h-full object-cover"
                controls
                poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-4 text-center text-black text-lg font-semibold drop-shadow">Live Sports Highlight</div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-4 w-full md:w-1/4 order-3 mt-4 md:mt-0">
            <div className="bg-white/80 rounded-xl shadow-lg p-4 min-h-[120px] flex flex-col items-center justify-center">
              <span className="font-bold text-lg text-gray-800">Trending News</span>
              <ul className="mt-2 text-sm text-gray-600">
                <li>News 1</li>
                <li>News 2</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl shadow-lg p-4 min-h-[120px] flex flex-col items-center justify-center">
              <span className="font-bold text-lg text-gray-800">Trending News</span>
              <ul className="mt-2 text-sm text-gray-600">
                <li>News 1</li>
                <li>News 2</li>
              </ul>
            </div>
            <div className="bg-white/80 rounded-xl shadow-lg p-4 min-h-[120px] flex flex-col items-center justify-center">
              <span className="font-bold text-lg text-gray-800">Stats</span>
              <ul className="mt-2 text-sm text-gray-600">
                <li>Stat 1</li>
                <li>Stat 2</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
     </>
  )
}

export default Hero