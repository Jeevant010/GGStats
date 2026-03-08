import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Header from '../Differ/single/Header';
import Footer from '../shared/Footer';
import GamesType from '../GamesType';
import DatePicker from '../DatePicker';
import { Target } from 'lucide-react';

const Cs2 = () => {
    const [schedule, setSchedule] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("All");
    const [showCount, setShowCount] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                // Fetch matches from our backend which calls HLTV
                const res = await axios.get('http://localhost:9000/api/esports/cs2', {
                    withCredentials: true // in case of CORS or session Needs
                });
                
                if (res.data?.success) {
                  setSchedule(res.data.data);
                } else {
                  throw new Error("Unable to fetch data from backend route");
                }
            } catch (err) {
                console.error("Error fetching CS2 schedule", err);
                setError(err.response?.data?.message || err.message || "Failed to fetch CS2 matches");
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    useEffect(() => { setShowCount(12); }, [selectedRegion, selectedDate]);

    // Filter matches by selected date (client-side)
    const dateFilteredSchedule = useMemo(() => {
        const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        
        return schedule.filter((match) => {
            if (!match.date) return false;
            const matchDateObj = new Date(match.date);
            const matchDateStr = `${matchDateObj.getFullYear()}-${String(matchDateObj.getMonth() + 1).padStart(2, '0')}-${String(matchDateObj.getDate()).padStart(2, '0')}`;
            return matchDateStr === dateStr;
        });
    }, [schedule, selectedDate]);

    const groupByLeague = (matches) => {
        return matches.reduce((groups, match) => {
            const league = match.event?.name || "Other";
            if (!groups[league]) groups[league] = [];
            groups[league].push(match);
            return groups;
        }, {});
    };

    const groupedSchedule = groupByLeague(dateFilteredSchedule);
    
    // Get top leagues by match count
    const leaguesByCount = Object.keys(groupedSchedule).sort(
        (a, b) => groupedSchedule[b].length - groupedSchedule[a].length
    );
    
    // Only show top 10 leagues as filters to avoid clutter
    const filterLeagues = leaguesByCount.slice(0, 10);
    const hasMoreLeagues = leaguesByCount.length > 10;
    
    const regions = ["All", ...filterLeagues, ...(hasMoreLeagues ? ["Other Tournaments"] : [])];

    // Determine what matches to show based on selected region/league filter
    let matchesToShow = [];
    if (selectedRegion === "All") {
        matchesToShow = dateFilteredSchedule;
    } else if (selectedRegion === "Other Tournaments") {
        const otherLeagues = leaguesByCount.slice(10);
        matchesToShow = otherLeagues.flatMap(league => groupedSchedule[league]);
    } else {
        matchesToShow = groupedSchedule[selectedRegion] || [];
    }

    const visibleMatches = matchesToShow.slice(0, showCount);

    const getStatusStyle = (live) => {
        if (live) return "bg-live/20 text-live animate-pulse";
        return "bg-upcoming/20 text-upcoming";
    };
    
    const getStatusLabel = (live) => {
        return live ? "🔴 LIVE" : "UPCOMING";
    };

    const isToday = selectedDate.toDateString() === new Date().toDateString();

    return (
        <>
            <Header />
            <GamesType />
            <div className="min-h-screen flex flex-col bg-surface-900">
                <main className="flex-1 w-full text-white py-6 px-4 lg:px-6 max-w-[1400px] mx-auto">
                    <div className="flex flex-col items-center gap-3 mb-6">
                        <h2 className="text-2xl font-bold flex items-center justify-center gap-2 tracking-wide">
                            <Target className="w-8 h-8 text-accent" />
                            CS2 — {isToday ? "Today's" : selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} Schedule
                        </h2>
                        <DatePicker selectedDate={selectedDate} onDateChange={(d) => { setSelectedDate(d); setSelectedRegion('All'); }} />
                    </div>

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
                            <div className="text-live text-lg bg-live/10 px-6 py-4 rounded-xl border border-live/30 max-w-xl text-center">
                                Error: {error}
                            </div>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            {filterLeagues.length > 0 && (
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
                                            {region !== "All" && region !== "Other Tournaments" && groupedSchedule[region] && 
                                                <span className="ml-1 opacity-60">({groupedSchedule[region].length})</span>
                                            }
                                        </button>
                                    ))}
                                </div>
                            )}

                            <p className="text-gray-500 text-sm text-center mb-4">
                                Showing {visibleMatches.length} of {matchesToShow.length} matches
                            </p>

                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {visibleMatches.map((matchData) => {
                                    // Handle missing opponents gracefully
                                    const teamA = matchData.team1 || { name: 'TBD' };
                                    const teamB = matchData.team2 || { name: 'TBD' };
                                    
                                    const matchDateStr = matchData.date ? new Date(matchData.date).toLocaleDateString("en-US", {
                                        month: "short", day: "numeric"
                                    }) : 'TBD';
                                    
                                    const matchTimeStr = matchData.date ? new Date(matchData.date).toLocaleTimeString("en-US", {
                                        hour: "2-digit", minute: "2-digit"
                                    }) : 'TBD';

                                    // Create a unique ID or fallback to indexing
                                    const matchId = matchData.id || `${teamA.name}-${teamB.name}-${matchData.date}`;

                                    return (
                                        <div key={matchId} className="glass rounded-xl p-4 hover:ring-1 hover:ring-accent/30 transition-all duration-300">
                                            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-400 truncate max-w-[150px]">
                                                        {matchData.event?.name || "Unknown Tournament"}
                                                    </span>
                                                </div>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-bold tracking-wider ${getStatusStyle(matchData.live)}`}>
                                                    {getStatusLabel(matchData.live)}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex flex-col items-center flex-1">
                                                    <div className="w-10 h-10 flex items-center justify-center bg-surface-800 rounded-full mb-1">
                                                      <span className="text-xs font-bold text-gray-300">{teamA.name.substring(0,2).toUpperCase()}</span>
                                                    </div>
                                                    <span className={`text-sm font-bold text-white text-center`} title={teamA.name}>
                                                        {teamA.name?.substring(0, 10) || 'TBD'}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xl font-bold text-gray-500">vs</span>
                                                </div>
                                                
                                                <div className="flex flex-col items-center flex-1">
                                                   <div className="w-10 h-10 flex items-center justify-center bg-surface-800 rounded-full mb-1">
                                                      <span className="text-xs font-bold text-gray-300">{teamB.name.substring(0,2).toUpperCase()}</span>
                                                    </div>
                                                    <span className={`text-sm font-bold text-center text-white`} title={teamB.name}>
                                                        {teamB.name?.substring(0, 10) || 'TBD'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-700/50">
                                                <div className="flex items-center gap-1.5">
                                                    {matchData.format && (
                                                        <span className="bg-surface-700 px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-300 uppercase">
                                                            {matchData.format}
                                                        </span>
                                                    )}
                                                     {matchData.stars > 0 && (
                                                        <span className="bg-surface-700 px-1.5 py-0.5 rounded text-[10px] uppercase text-yellow-500 font-bold">
                                                            {"★".repeat(matchData.stars)}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="flex items-center gap-1 font-medium">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                                    {matchDateStr} • {matchTimeStr}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {showCount < matchesToShow.length && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        onClick={() => setShowCount(prev => prev + 12)}
                                        className="px-6 py-2 bg-surface-700 text-gray-300 rounded-full hover:bg-accent hover:text-white transition-all duration-200 border border-white/5 hover:border-accent shadow-lg"
                                    >
                                        Load More ({matchesToShow.length - showCount} remaining)
                                    </button>
                                </div>
                            )}

                            {matchesToShow.length === 0 && (
                                <div className="text-center text-gray-500 mt-16 flex flex-col items-center gap-3">
                                    <Target className="w-12 h-12 text-gray-600 opacity-50" />
                                    <p>No matches found for {isToday ? 'today' : selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.</p>
                                </div>
                            )}
                        </>
                    )}
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Cs2;
