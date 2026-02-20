import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Differ/single/Header';
import SportsType from '../SportsType';
import Footer from '../shared/Footer';

const FormulaOne = () => {
    const [races, setRaces] = useState([]);
    const [selectedType, setSelectedType] = useState("All");
    const [showCount, setShowCount] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                const currentYear = new Date().getFullYear();
                const response = await axios.get(`https://v1.formula-1.api-sports.io/races?season=${currentYear}`, {
                    headers: { 'x-apisports-key': API_KEY }
                });
                setRaces(response.data.response);
            } catch (err) {
                console.error("Error fetching F1 races", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRaces();
    }, []);

    useEffect(() => { setShowCount(12); }, [selectedType]);

    const groupByType = (raceList) => {
        return raceList.reduce((groups, race) => {
            const type = race.type || "Other";
            if (!groups[type]) groups[type] = [];
            groups[type].push(race);
            return groups;
        }, {});
    };

    const groupedRaces = groupByType(races);
    const types = ["All", ...Object.keys(groupedRaces)];
    const racesToShow = selectedType === "All" ? races : (groupedRaces[selectedType] || []);
    const visibleRaces = racesToShow.slice(0, showCount);

    const getStatusStyle = (status) => {
        if (!status) return "bg-gray-600 text-gray-200";
        const s = status.toLowerCase();
        if (s === "completed") return "bg-win/20 text-win";
        if (s === "live" || s === "in progress") return "bg-live/20 text-live animate-pulse";
        if (s === "scheduled") return "bg-upcoming/20 text-upcoming";
        if (s === "cancelled" || s === "postponed") return "bg-surface-500 text-gray-300";
        return "bg-accent/20 text-accent";
    };

    const getStatusLabel = (status) => {
        if (!status) return "TBD";
        const s = status.toLowerCase();
        if (s === "live" || s === "in progress") return "🔴 LIVE";
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            <Header />
            <SportsType />
            <main className="flex-1 w-full text-white py-6 px-4 lg:px-6 max-w-[1400px] mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-center tracking-wide">
                    🏎️ Formula 1 — {new Date().getFullYear()} Season
                </h2>

                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                            <div className="text-gray-400 text-lg">Loading F1 races...</div>
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
                            {types.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${selectedType === type
                                        ? "bg-accent/15 text-accent border border-accent/30"
                                        : "bg-surface-700 text-gray-400 hover:bg-surface-600 hover:text-white border border-transparent"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <p className="text-gray-500 text-sm text-center mb-4">
                            Showing {visibleRaces.length} of {racesToShow.length} events
                        </p>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {visibleRaces.map((race, index) => {
                                const raceDate = race.date
                                    ? new Date(race.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                                    : "TBD";
                                const raceTime = race.date
                                    ? new Date(race.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                                    : "";

                                return (
                                    <div key={race.id || index} className="glass rounded-xl p-4 hover:ring-1 hover:ring-accent/30 transition-all duration-300">
                                        <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
                                            <div className="flex items-center gap-2">
                                                {race.competition?.image && (
                                                    <img src={race.competition.image} alt={race.competition?.name} className="w-6 h-6 rounded object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                                                )}
                                                <span className="text-sm font-semibold text-white truncate max-w-[180px]">
                                                    {race.competition?.name || "Unknown GP"}
                                                </span>
                                            </div>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(race.status)}`}>
                                                {getStatusLabel(race.status)}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-2 mb-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs bg-surface-600 text-gray-300 px-3 py-1 rounded-full">
                                                    {race.type || "Session"}
                                                </span>
                                                {race.laps?.total && (
                                                    <span className="text-xs text-gray-500">{race.laps.total} Laps</span>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {race.circuit?.image && (
                                                    <img src={race.circuit.image} alt={race.circuit?.name} className="w-16 h-10 rounded object-contain bg-surface-600/50 p-1" onError={(e) => { e.target.style.display = 'none'; }} />
                                                )}
                                                <div>
                                                    <p className="text-sm text-gray-300">{race.circuit?.name || "TBD"}</p>
                                                    {race.competition?.location?.country && (
                                                        <p className="text-xs text-gray-500">{race.competition.location.country}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {race.fastest_lap?.driver && (
                                                <div className="bg-purple-500/10 rounded-lg px-3 py-2 border border-purple-500/20">
                                                    <p className="text-xs text-purple-300">
                                                        ⚡ Fastest Lap: <span className="text-white font-semibold">{race.fastest_lap.driver.id}</span>
                                                        {race.fastest_lap.time && <span className="text-purple-400 ml-1">({race.fastest_lap.time})</span>}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
                                            <span>📅 {raceDate}</span>
                                            {raceTime && <span>🕐 {raceTime}</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {showCount < racesToShow.length && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={() => setShowCount(prev => prev + 12)}
                                    className="px-6 py-2 bg-surface-700 text-gray-300 rounded-full hover:bg-accent hover:text-white transition-all duration-200 border border-white/5 hover:border-accent"
                                >
                                    Load More ({racesToShow.length - showCount} remaining)
                                </button>
                            </div>
                        )}

                        {racesToShow.length === 0 && (
                            <div className="text-center text-gray-500 mt-10">No events found for this type.</div>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default FormulaOne;
