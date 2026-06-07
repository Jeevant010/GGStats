import React, { useState, useEffect, useCallback } from 'react';
import { CalendarDays, Trophy, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import { TournamentCard } from './TournamentCard';

export const UpcomingEvents = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSport, setSelectedSport] = useState("All");

  const fetchTournaments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
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
  }, []);

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const sports = ["All", ...new Set(tournaments.map(t => t.sport))];
  const filteredTournaments = selectedSport === "All"
    ? tournaments
    : tournaments.filter(t => t.sport === selectedSport);

  return (
    <section className="py-16 px-4 lg:px-6 max-w-[1400px] mx-auto">
      {/* 1. Header with Title and Filter Pills */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-3">
          <CalendarDays size={26} className="text-accent" />
          <h2 className="text-2xl font-black text-white uppercase tracking-wider">Major Tournaments</h2>
        </div>

        {/* Filter Pills (Brings back the sport filter buttons!) */}
        {!loading && !error && tournaments.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {sports.map(sport => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                  selectedSport === sport
                    ? 'bg-accent border-accent text-white shadow-lg shadow-accent/25 scale-[1.02]'
                    : 'bg-surface-800 border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. Loading Skeleton */}
      {loading && (
        <div className="flex flex-col gap-10 animate-pulse">
          {[1, 2].map(n => (
            <div key={n} className="bg-surface-800/40 border border-white/5 rounded-3xl h-[350px] w-full" />
          ))}
        </div>
      )}

      {/* 3. Error Message */}
      {!loading && error && (
        <div className="flex flex-col items-center py-20 bg-red-500/5 border border-red-500/10 rounded-3xl text-center">
          <AlertCircle size={40} className="text-red-500 mb-4" />
          <p className="text-gray-400 text-sm max-w-md mb-6">{error}</p>
          <button 
            onClick={fetchTournaments} 
            disabled={loading}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all"
          >
            Try Again
          </button>
        </div>
      )}

      {/* 4. Empty State */}
      {!loading && !error && filteredTournaments.length === 0 && (
        <div className="flex flex-col items-center py-24 bg-surface-800/20 border border-white/5 rounded-3xl text-center">
          <Trophy size={48} className="text-gray-600 mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No Tournaments Scheduled</h3>
          <p className="text-gray-500 text-sm">Check back later for upcoming {selectedSport !== 'All' ? selectedSport : ''} events.</p>
        </div>
      )}

      {/* 5. Clean, Alternating Zigzag Vertical List (Borders & spacing) */}
      {!loading && !error && filteredTournaments.length > 0 && (
        <div className="flex flex-col gap-12 md:gap-16">
          {filteredTournaments.map((tournament, idx) => (
            <TournamentCard 
              key={tournament._id} 
              tournament={tournament} 
              index={idx} // <-- Passing index for correct zigzag alternating layout
            />
          ))}
        </div>
      )}
    </section>
  );
};
