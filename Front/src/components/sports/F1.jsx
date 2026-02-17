import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Differ/single/Header';
import SportsType from '../SportsType';

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
                    headers: {
                        'x-apisports-key': API_KEY
                    }
                });
                setRaces(response.data.response);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching F1 races", err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchRaces();
    }, []);

    // Reset showCount when type changes
    useEffect(() => {
        setShowCount(12);
    }, [selectedType]);

    // Group by race type (Race, Qualifying, Practice, Sprint)
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
    const racesToShow = selectedType === "All"
        ? races
        : (groupedRaces[selectedType] || []);
    const visibleRaces = racesToShow.slice(0, showCount);

    // Status styling
    const getStatusStyle = (status) => {
        if (!status) return "bg-gray-600 text-gray-200";
        const s = status.toLowerCase();
        if (s === "completed") return "bg-green-600/80 text-green-100";
        if (s === "live" || s === "in progress") return "bg-red-600 text-white animate-pulse";
        if (s === "scheduled") return "bg-yellow-600/80 text-yellow-100";
        if (s === "cancelled" || s === "postponed") return "bg-gray-600 text-gray-200";
        return "bg-blue-600/80 text-blue-100";
    };

    const getStatusLabel = (status) => {
        if (!status) return "TBD";
        const s = status.toLowerCase();
        if (s === "live" || s === "in progress") return "🔴 LIVE";
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    if (loading) {
        return (
            <>
                <Header />
                <SportsType />
                <div className="bg-gray-900 flex items-center justify-center p-16 min-h-screen">
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-gray-400 text-lg">Loading F1 races...</div>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <SportsType />
                <div className="bg-gray-900 flex items-center justify-center p-16 min-h-screen">
                    <div className="text-red-400 text-lg bg-red-900/30 px-6 py-4 rounded-xl border border-red-800">
                        Error: {error}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <SportsType />
            <div className="min-h-screen w-full bg-gray-900 text-white p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-4 text-center tracking-wide">
                    🏎️ Formula 1 — {new Date().getFullYear()} Season
                </h2>

                {/* Type Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedType === type
                                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105"
                                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Race count */}
                <p className="text-gray-500 text-sm text-center mb-4">
                    Showing {visibleRaces.length} of {racesToShow.length} events
                </p>

                {/* Race Cards Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {visibleRaces.map((race, index) => {
                        const raceDate = race.date
                            ? new Date(race.date).toLocaleDateString("en-US", {
                                weekday: "short", month: "short", day: "numeric", year: "numeric"
                            })
                            : "TBD";
                        const raceTime = race.date
                            ? new Date(race.date).toLocaleTimeString("en-US", {
                                hour: "2-digit", minute: "2-digit"
                            })
                            : "";

                        return (
                            <div
                                key={race.id || index}
                                className="bg-gray-800/90 rounded-xl border border-gray-700/50 p-4 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300"
                            >
                                {/* Competition Header */}
                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
                                    <div className="flex items-center gap-2">
                                        {race.competition?.image && (
                                            <img
                                                src={race.competition.image}
                                                alt={race.competition?.name}
                                                className="w-6 h-6 rounded object-contain"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                        <span className="text-sm font-semibold text-white truncate max-w-[180px]">
                                            {race.competition?.name || "Unknown GP"}
                                        </span>
                                    </div>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(race.status)}`}>
                                        {getStatusLabel(race.status)}
                                    </span>
                                </div>

                                {/* Race Details */}
                                <div className="flex flex-col gap-2 mb-3">
                                    {/* Type Badge */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full">
                                            {race.type || "Session"}
                                        </span>
                                        {race.laps?.total && (
                                            <span className="text-xs text-gray-500">
                                                {race.laps.total} Laps
                                            </span>
                                        )}
                                    </div>

                                    {/* Circuit Info */}
                                    <div className="flex items-center gap-2">
                                        {race.circuit?.image && (
                                            <img
                                                src={race.circuit.image}
                                                alt={race.circuit?.name}
                                                className="w-16 h-10 rounded object-contain bg-gray-700/50 p-1"
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        )}
                                        <div>
                                            <p className="text-sm text-gray-300">{race.circuit?.name || "TBD"}</p>
                                            {race.competition?.location?.country && (
                                                <p className="text-xs text-gray-500">{race.competition.location.country}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Fastest Lap */}
                                    {race.fastest_lap?.driver && (
                                        <div className="bg-purple-900/30 rounded-lg px-3 py-2 border border-purple-700/30">
                                            <p className="text-xs text-purple-300">
                                                ⚡ Fastest Lap: <span className="text-white font-semibold">{race.fastest_lap.driver.id}</span>
                                                {race.fastest_lap.time && (
                                                    <span className="text-purple-400 ml-1">({race.fastest_lap.time})</span>
                                                )}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
                                    <span>📅 {raceDate}</span>
                                    {raceTime && <span>🕐 {raceTime}</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Load More */}
                {showCount < racesToShow.length && (
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setShowCount(prev => prev + 12)}
                            className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-red-600 hover:text-white transition-all duration-200 border border-gray-700 hover:border-red-600"
                        >
                            Load More ({racesToShow.length - showCount} remaining)
                        </button>
                    </div>
                )}

                {racesToShow.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">No events found for this type.</div>
                )}
            </div>
        </>
    );
};

export default FormulaOne;
