import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import { TrendingUp, Calendar, Trophy, Play } from 'lucide-react';

const Hero = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    gsap.fromTo('.hero-card', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      delay: 0.3,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    const config = {
      method: 'get',
      url: 'https://v3.football.api-sports.io/teams/countries',
      headers: {
        'x-apisports-key': import.meta.env.VITE_FOOTBALL_API_KEY || "",
      }
    };
    axios(config)
      .then(response => setLeagues(response.data.response || []))
      .catch(error => console.error('Failed to fetch leagues:', error));
  }, []);

  return (
    <section className="py-8 px-4 lg:px-6 max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left Cards */}
        <div className="flex flex-col gap-4 lg:w-[280px] shrink-0 order-2 lg:order-1">
          <div className="hero-card glass rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">Live Scores</h3>
            </div>
            <ul className="space-y-2.5">
              {leagues.length > 0 ? leagues.slice(0, 5).map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  {item.flag && <img src={item.flag} alt={item.name} className="w-5 h-4 rounded-sm object-cover" />}
                  <span className="truncate">{item.name}</span>
                </li>
              )) : (
                Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="h-5 bg-surface-600 rounded animate-pulse" />
                ))
              )}
            </ul>
          </div>

          <div className="hero-card glass rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-upcoming" />
              <h3 className="text-sm font-semibold text-white">Upcoming</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-400">IND vs AUS</span>
                <span className="text-xs text-upcoming bg-upcoming/10 px-2 py-0.5 rounded-full">Today</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-400">ENG vs SA</span>
                <span className="text-xs text-gray-500">Tomorrow</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-400">PSG vs BAR</span>
                <span className="text-xs text-gray-500">Feb 22</span>
              </li>
            </ul>
          </div>

          <div className="hero-card glass rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={18} className="text-win" />
              <h3 className="text-sm font-semibold text-white">Top Performers</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-400">V. Kohli</span>
                <span className="text-xs text-win">1,234 runs</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-gray-400">L. Messi</span>
                <span className="text-xs text-win">22 goals</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Center Video */}
        <div className="hero-card flex-1 order-1 lg:order-2">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden glow-accent">
            <video
              className="w-full h-full object-cover"
              controls
              poster="https://images.unsplash.com/photo-1461896836934-bd45ba7296de?auto=format&fit=crop&w=800&q=80"
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-live/90 px-2.5 py-1 rounded-full">
              <div className="live-dot" />
              <span className="text-white text-xs font-semibold">LIVE</span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Play size={16} className="text-accent" />
            <span className="text-gray-300 text-sm font-medium">Featured Sports Highlight</span>
          </div>
        </div>

        {/* Right Cards */}
        <div className="flex flex-col gap-4 lg:w-[280px] shrink-0 order-3">
          <div className="hero-card glass rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} className="text-purple-400" />
              <h3 className="text-sm font-semibold text-white">Trending</h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">📰 FIFA 2026 venues announced</li>
              <li className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">📰 IPL auction highlights</li>
              <li className="text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">📰 Valorant Champions Tour</li>
            </ul>
          </div>

          <div className="hero-card glass rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">Quick Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-surface-700 rounded-lg">
                <div className="text-xl font-bold text-accent">24</div>
                <div className="text-xs text-gray-500">Live Now</div>
              </div>
              <div className="text-center p-3 bg-surface-700 rounded-lg">
                <div className="text-xl font-bold text-upcoming">128</div>
                <div className="text-xs text-gray-500">Today</div>
              </div>
              <div className="text-center p-3 bg-surface-700 rounded-lg">
                <div className="text-xl font-bold text-win">89</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
              <div className="text-center p-3 bg-surface-700 rounded-lg">
                <div className="text-xl font-bold text-purple-400">12</div>
                <div className="text-xs text-gray-500">Sports</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;