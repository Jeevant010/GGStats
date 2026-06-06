import React, { useState, useEffect } from 'react';
import { CalendarDays, Trophy, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { TournamentCard } from './TournamentCard';

export const UpcomingEvents = () => {
    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSport, setSelectedSport] = useState("All");

    useEffect(() => {
        const fetchTournaments = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/tournaments');
                if (response.data?.success) {
                    setTournaments(response.data.data);
                } else {
                    setError("Failed to fetch tournaments data.");
                }
            } catch (err) {
                console.error("Error fetching tournaments:", err);
                setError(err.response?.data?.message || "Error connecting to the backend server.");
            } finally {
                setLoading(false);
            }
        };
        fetchTournaments();
    }, []);

    const sports = ["All", ...new Set(tournaments.map(t => t.sport))];
    const filteredTournaments = selectedSport === "All" 
        ? tournaments 
        : tournaments.filter(t => t.sport === selectedSport);

    return (
        <section className="py-12 px-4 lg:px-6 max-w-[1400px] mx-auto">
            {/* Header with filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <CalendarDays size={24} className="text-accent" />
                    <h2 className="text-2xl font-black text-white uppercase tracking-wide">Major Tournaments</h2>
                </div>
                {!loading && !error && tournaments.length > 0 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                        {sports.map(sport => (
                            <button
                                key={sport}
                                onClick={() => setSelectedSport(sport)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase transition-all duration-300 border ${
                                    selectedSport === sport
                                        ? 'bg-accent border-accent text-white'
                                        : 'bg-surface-800 border-white/5 text-gray-400 hover:text-white'
                                }`}
                            >
                                {sport}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Loading Skeleton */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                    {[1, 2, 3, 4].map(n => (
                        <div key={n} className="bg-surface-800/50 border border-white/5 rounded-2xl h-[380px]" />
                    ))}
                </div>
            )}

            {/* Error Message */}
            {!loading && error && (
                <div className="flex flex-col items-center py-16 bg-red-500/5 border border-red-500/10 rounded-2xl text-center">
                    <AlertCircle className="text-red-500 mb-2" />
                    <p className="text-gray-400 text-sm mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold">
                        Try Again
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredTournaments.length === 0 && (
                <div className="flex flex-col items-center py-20 bg-surface-800/30 border border-white/5 rounded-2xl text-center">
                    <Trophy className="text-gray-600 mb-2" />
                    <p className="text-gray-500 text-sm">No Tournaments Scheduled.</p>
                </div>
            )}

            {/* Grid display */}
            {!loading && !error && filteredTournaments.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    {filteredTournaments.map(tournament => (
                        <TournamentCard key={tournament._id} tournament={tournament} />
                    ))}
                </div>
            )}
        </section>
    );
};
