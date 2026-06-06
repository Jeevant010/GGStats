import React, { useState } from 'react';
import { MapPin, Trophy, ArrowRight } from 'lucide-react';
import { CountdownTimer } from '../common/CountdownTimer';

export const TournamentCard = ({ tournament, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Format start date and time
    const startDateTime = new Date(tournament.startDate).toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex flex-col md:flex-row odd:md:flex-row-reverse gap-8 md:gap-16 items-stretch w-full bg-surface-800/10 border border-white/5 hover:border-white/10 p-6 md:p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:bg-surface-800/30"
        >
            {/* 1. Media Container (50% on Desktop) */}
            <div className="w-full md:w-1/2 aspect-[16/10] relative rounded-2xl overflow-hidden z-0 bg-surface-900 border border-white/5">
                {/* Static Image */}
                <img
                    src={tournament.coverImage}
                    alt={tournament.title}
                    className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
                        isHovered ? 'scale-105 opacity-80' : 'scale-100 opacity-100'
                    }`}
                />

                {/* HTML5 Video Overlay (Seamless Fade-in on Hover) */}
                {tournament.videoUrl && (
                    <video
                        src={tournament.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
                            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    />
                )}

                {/* Cover Image Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 2. Textual Details Container (50% on Desktop, Vertically Centered) */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-4 py-4">
                
                {/* Eyebrow info (Date & Category) */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-accent/20 text-accent rounded-md border border-accent/20">
                        {tournament.sport}
                    </span>
                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">
                        {startDateTime}
                    </span>
                </div>

                {/* Bold Event Title */}
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                    {tournament.title}
                </h2>

                {/* Brief Description */}
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                    {tournament.description}
                </p>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-6 mt-2 pb-2">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <MapPin size={14} className="text-gray-500 shrink-0" />
                        <span className="font-medium">{tournament.location}</span>
                    </div>

                    {/* End Date */}
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                        <Trophy size={14} className="text-gray-500 shrink-0" />
                        <span>Ends {new Date(tournament.endDate).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Action Row: CTA Button + Live Countdown */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-white/5">
                    {/* Primary CTA Button */}
                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-surface-900 font-bold rounded-xl text-xs uppercase tracking-wider transition-all duration-300 hover:bg-accent hover:text-white hover:scale-[1.02] hover:shadow-lg hover:shadow-accent/20 active:scale-[0.98]">
                        <span>View Details</span>
                        <ArrowRight size={14} />
                    </button>

                    {/* Live Timer */}
                    <CountdownTimer 
                        startDate={tournament.startDate} 
                        endDate={tournament.endDate} 
                    />
                </div>

            </div>
        </div>
    );
};
