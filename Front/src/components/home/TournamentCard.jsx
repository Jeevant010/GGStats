import React from 'react';
import { MapPin, Trophy } from 'lucide-react';
import { CountdownTimer } from '../common/CountdownTimer';

export const TournamentCard = ({ tournament }) => {
    return (
        <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-surface-800/40 p-6 transition-all duration-500 hover:border-accent/30 hover:bg-surface-800/80 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1">
            <div className="absolute inset-0 z-0 opacity-10 mix-blend-luminosity grayscale transition-all duration-500 group-hover:opacity-25 group-hover:scale-105">
                <img
                    src={tournament.coverImage}
                    alt=""
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent" />
            </div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-white/10 text-white rounded-md">
                        {tournament.sport}
                    </span>
                    {tournament.tags?.[0] && (
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                            #{tournament.tags[0]}
                        </span>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-black text-white leading-tight group-hover:text-accent transition-colors duration-300">
                        {tournament.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-400 line-clamp-3 leading-relaxed">
                        {tournament.description}
                    </p>
                </div>
            </div>

            {/* Card Footer Details */}
            <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex flex-col gap-3.5">
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <MapPin size={14} className="text-gray-500 shrink-0" />
                    <span className="truncate">{tournament.location}</span>
                </div>

                <div className="flex items-center justify-between gap-2 mt-1">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Trophy size={14} />
                        <span>
                            {new Date(tournament.startDate).toLocaleDateString(undefined, { 
                                month: 'short', 
                                day: 'numeric' 
                             })}
                        </span>
                    </div>
                    
                    <CountdownTimer 
                        startDate={tournament.startDate} 
                        endDate={tournament.endDate} 
                    />
                </div>
            </div>
        </div>
    );
};
