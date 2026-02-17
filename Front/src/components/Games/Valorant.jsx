import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
                    headers: {
                        'Authorization': API_KEY
                    }
                });
                setSchedule(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching schedule", err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    // Reset showCount when region changes
    useEffect(() => {
        setShowCount(12);
    }, [selectedRegion]);

    // Group matches by region
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
    const matchesToShow = selectedRegion === "All"
        ? schedule
        : (groupedSchedule[selectedRegion] || []);
    const visibleMatches = matchesToShow.slice(0, showCount);

    // Status badge color
    const getStatusStyle = (state) => {
        switch (state) {
            case "completed": return "bg-green-600/80 text-green-100";
            case "inprogress": return "bg-red-600 text-white animate-pulse";
            case "unstarted": return "bg-yellow-600/80 text-yellow-100";
            default: return "bg-gray-600 text-gray-200";
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-900 flex items-center justify-center p-16">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-gray-400 text-lg">Loading schedule...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 flex items-center justify-center p-16">
                <div className="text-red-400 text-lg bg-red-900/30 px-6 py-4 rounded-xl border border-red-800">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-gray-900 text-white p-6">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-4 text-center tracking-wide">
                🎮 Valorant Esports Schedule
            </h2>

            {/* Region Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {regions.map((region) => (
                    <button
                        key={region}
                        onClick={() => setSelectedRegion(region)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedRegion === region
                                ? "bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105"
                                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                        {region}
                    </button>
                ))}
            </div>

            {/* Match count */}
            <p className="text-gray-500 text-sm text-center mb-4">
                Showing {visibleMatches.length} of {matchesToShow.length} matches
            </p>

            {/* Match Cards Grid */}
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
                        <div
                            key={matchData?.match?.id || index}
                            className="bg-gray-800/90 rounded-xl border border-gray-700/50 p-4 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
                        >
                            {/* League Header */}
                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={matchData.league.icon}
                                        alt={matchData.league.name}
                                        className="w-5 h-5 rounded object-contain"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                    <span className="text-xs text-gray-400 truncate max-w-[150px]">
                                        {matchData.league.name}
                                    </span>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(matchData.state)}`}>
                                    {matchData.state === "inprogress" ? "🔴 LIVE" : matchData.state.toUpperCase()}
                                </span>
                            </div>

                            {/* Teams */}
                            <div className="flex items-center justify-between mb-3">
                                {/* Team A */}
                                <div className="flex flex-col items-center gap-1 flex-1">
                                    <img
                                        src={teamA.icon}
                                        alt={teamA.code}
                                        className="w-10 h-10 object-contain"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                    />
                                    <span className={`text-xs font-semibold text-center ${teamA.has_won ? 'text-green-400' : 'text-gray-300'}`}>
                                        {teamA.code}
                                    </span>
                                </div>

                                {/* Score */}
                                <div className="flex items-center gap-2 mx-2">
                                    <span className={`text-2xl font-bold ${teamA.has_won ? 'text-green-400' : 'text-white'}`}>
                                        {teamA.game_wins}
                                    </span>
                                    <span className="text-gray-500 text-lg">-</span>
                                    <span className={`text-2xl font-bold ${teamB.has_won ? 'text-green-400' : 'text-white'}`}>
                                        {teamB.game_wins}
                                    </span>
                                </div>

                                {/* Team B */}
                                <div className="flex flex-col items-center gap-1 flex-1">
                                    <img
                                        src={teamB.icon}
                                        alt={teamB.code}
                                        className="w-10 h-10 object-contain"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                    />
                                    <span className={`text-xs font-semibold text-center ${teamB.has_won ? 'text-green-400' : 'text-gray-300'}`}>
                                        {teamB.code}
                                    </span>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
                                <span>Bo{matchData.match.game_type.count}</span>
                                <span>{matchDate} • {matchTime}</span>
                                {matchData.vod && (
                                    <a
                                        href={matchData.vod}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-400 hover:text-red-300 font-medium"
                                    >
                                        ▶ VOD
                                    </a>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Load More */}
            {showCount < matchesToShow.length && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => setShowCount(prev => prev + 12)}
                        className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200 border border-gray-700 hover:border-red-500"
                    >
                        Load More 
                    </button>
                </div>
            )}

            {matchesToShow.length === 0 && (
                <div className="text-center text-gray-500 mt-10">No matches found for this region.</div>
            )}
        </div>
    );
};

export default Valorant;
