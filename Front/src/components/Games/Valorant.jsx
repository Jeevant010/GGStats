import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Differ/single/Header';
// import GamesType from '../GamesType';
import Footer from '../shared/Footer';

const Valorant = () => {
    const [schedule, setSchedule] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [showCount, setShowCount] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_VALORANT_SCHEDULE_API;

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get('https://api.henrikdev.xyz/valorant/v1/esports/schedule', {
                    headers: { 'Authorization': API_KEY }
                });
                setSchedule(response.data.data);
            } catch (err) {
                console.error("Error fetching schedule", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    useEffect(() => { setShowCount(12); }, [selectedRegion]);

    const groupByRegion = (matches) => {
        return matches.reduce((groups, match) => {
            const region = match.league.region || "Other";
            if (!groups[region]) groups[region] = [];
            groups[region].push(match);
            return groups;
        }, {});
    };

    const groupedSchedule = groupByRegion(schedule);
    const regions = ["All", ...Object.keys(groupedSchedule)];
    const matchesToShow = selectedRegion === "All" ? schedule : (groupedSchedule[selectedRegion] || []);
    const visibleMatches = matchesToShow.slice(0, showCount);

    const getStatusStyle = (state) => {
        switch (state) {
            case "completed": return "bg-win/20 text-win";
            case "inprogress": case "running": return "bg-live/20 text-live animate-pulse";
            case "unstarted": return "bg-upcoming/20 text-upcoming";
            default: return "bg-surface-500 text-gray-300";
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            {/* <Header /> */}
            {/* <GamesType /> */}
            <main className="flex-1 w-full text-white py-6 px-4 lg:px-6 max-w-[1400px] mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center tracking-wide">
                    🎮 Valorant Esports Schedule
                </h2>

                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                            <div className="text-gray-400 text-lg">Loading schedule...</div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-live text-lg bg-live/10 px-6 py-4 rounded-xl border border-live/30">
                            Error: {error}
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="flex flex-wrap gap-2 mb-6 justify-center">
                            {regions.map((region) => (
                                <button
                                    key={region}
                                    onClick={() => setSelectedRegion(region)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${selectedRegion === region
                                        ? "bg-accent/15 text-accent border border-accent/30"
                                        : "bg-surface-700 text-gray-400 hover:bg-surface-600 hover:text-white border border-transparent"
                                        }`}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>

                        <p className="text-gray-500 text-sm text-center mb-4">
                            Showing {visibleMatches.length} of {matchesToShow.length} matches
                        </p>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {visibleMatches.map((matchData, index) => {
                                const teamA = matchData.match.teams[0];
                                const teamB = matchData.match.teams[1];
                                const matchDate = new Date(matchData.date).toLocaleDateString("en-US", {
                                    month: "short", day: "numeric", year: "numeric"
                                });
                                const matchTime = new Date(matchData.date).toLocaleTimeString("en-US", {
                                    hour: "2-digit", minute: "2-digit"
                                });

                                return (
                                    <div key={matchData?.match?.id || index} className="glass rounded-xl p-4 hover:ring-1 hover:ring-accent/30 transition-all duration-300">
                                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
                                            <div className="flex items-center gap-2">
                                                <img src={matchData.league.icon} alt={matchData.league.name} className="w-5 h-5 rounded object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                                                <span className="text-xs text-gray-400 truncate max-w-[150px]">{matchData.league.name}</span>
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(matchData.state)}`}>
                                                {matchData.state === "inprogress" ? "🔴 LIVE" : matchData.state.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex flex-col items-center gap-1 flex-1">
                                                <img src={teamA.icon} alt={teamA.code} className="w-10 h-10 object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} />
                                                <span className={`text-xs font-semibold text-center ${teamA.has_won ? 'text-win' : 'text-gray-300'}`}>{teamA.code}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mx-2">
                                                <span className={`text-2xl font-bold ${teamA.has_won ? 'text-win' : 'text-white'}`}>{teamA.game_wins}</span>
                                                <span className="text-gray-500 text-lg">-</span>
                                                <span className={`text-2xl font-bold ${teamB.has_won ? 'text-win' : 'text-white'}`}>{teamB.game_wins}</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 flex-1">
                                                <img src={teamB.icon} alt={teamB.code} className="w-10 h-10 object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} />
                                                <span className={`text-xs font-semibold text-center ${teamB.has_won ? 'text-win' : 'text-gray-300'}`}>{teamB.code}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
                                            <span>Bo{matchData.match.game_type.count}</span>
                                            <span>{matchDate} • {matchTime}</span>
                                            {matchData.vod && (
                                                <a href={matchData.vod} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover font-medium">
                                                    ▶ VOD
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {showCount < matchesToShow.length && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => setShowCount(prev => prev + 12)}
                                    className="px-6 py-2 bg-surface-700 text-gray-300 rounded-full hover:bg-accent hover:text-white transition-all duration-200 border border-white/5 hover:border-accent"
                                >
                                    Load More
                                </button>
                            </div>
                        )}

                        {matchesToShow.length === 0 && (
                            <div className="text-center text-gray-500 mt-10">No matches found for this region.</div>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Valorant;
