import React, { useState } from "react";
import Header from "../components/Differ/single/Header";
import SportsType from "../components/SportsType";
import Footer from "../components/shared/Footer";
import LiveScoreCard from "../components/LiveScoreCard";
import useLiveScores from "../hooks/useLiveScores";
import { Radio, RefreshCw, Wifi, WifiOff, Clock, Filter } from "lucide-react";

const SPORT_ICONS = {
    Basketball: '🏀',
    Football: '🏈',
    Soccer: '⚽',
    Cricket: '🏏',
    Baseball: '⚾',
    Hockey: '🏒',
    Tennis: '🎾',
    Valorant: '🎮',
};

const Live = () => {
    const { scores, groupedScores, availableSports, loading, error, lastUpdated, refresh } =
        useLiveScores(new Date());
    const [activeFilter, setActiveFilter] = useState('All');
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        refresh();
        setTimeout(() => setRefreshing(false), 1000);
    };

    // STRICT: Only show matches that are currently LIVE (in progress)
    const liveOnlyScores = scores.filter((s) => s.gameState === 'live');

    // Group live-only scores by sport
    const liveGrouped = liveOnlyScores.reduce((acc, score) => {
        if (!acc[score.sport]) acc[score.sport] = [];
        acc[score.sport].push(score);
        return acc;
    }, {});

    const liveAvailableSports = [...new Set(liveOnlyScores.map((s) => s.sport))];

    // Filter by sport selection
    const filteredGrouped =
        activeFilter === 'All'
            ? liveGrouped
            : { [activeFilter]: liveGrouped[activeFilter] || [] };

    const totalMatches = activeFilter === 'All'
        ? liveOnlyScores.length
        : (liveGrouped[activeFilter] || []).length;

    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            <Header />
            <SportsType />
            <main className="flex-1 py-6 px-4 lg:px-6 max-w-[1400px] mx-auto w-full">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Radio size={22} className="text-live" />
                            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-live animate-ping" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Live Now</h1>
                        {!loading && (
                            <span className="text-xs text-gray-500 bg-surface-700 px-2.5 py-1 rounded-full ml-1">
                                <span className="text-live">{totalMatches} live</span>
                            </span>
                        )}
                    </div>

                    {/* Refresh & Status */}
                    <div className="flex items-center gap-3">
                        {lastUpdated && (
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                <Clock size={12} />
                                <span>
                                    Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        )}
                        <button
                            onClick={handleRefresh}
                            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-accent bg-surface-700 hover:bg-surface-600 px-3 py-1.5 rounded-lg transition-all duration-200"
                            disabled={refreshing}
                        >
                            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Sport Filter Tabs */}
                {liveAvailableSports.length > 1 && (
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        <Filter size={14} className="text-gray-500 flex-shrink-0" />
                        <button
                            onClick={() => setActiveFilter('All')}
                            className={`sport-filter-tab ${activeFilter === 'All' ? 'active' : ''}`}
                        >
                            All Sports
                        </button>
                        {liveAvailableSports.map((sport) => (
                            <button
                                key={sport}
                                onClick={() => setActiveFilter(sport)}
                                className={`sport-filter-tab ${activeFilter === sport ? 'active' : ''}`}
                            >
                                <span>{SPORT_ICONS[sport] || '🏅'}</span>
                                {sport}
                                <span className="text-[10px] opacity-60">
                                    ({liveGrouped[sport]?.length || 0})
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="glass rounded-xl p-5 animate-pulse">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-4 w-16 bg-surface-600 rounded" />
                                    <div className="h-4 w-12 bg-surface-600 rounded" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-surface-600 rounded-full" />
                                            <div className="h-4 w-24 bg-surface-600 rounded" />
                                        </div>
                                        <div className="h-6 w-8 bg-surface-600 rounded" />
                                    </div>
                                    <div className="h-px bg-surface-600" />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-surface-600 rounded-full" />
                                            <div className="h-4 w-20 bg-surface-600 rounded" />
                                        </div>
                                        <div className="h-6 w-8 bg-surface-600 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="glass rounded-xl p-8 text-center">
                        <WifiOff size={40} className="text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm mb-4">{error}</p>
                        <button
                            onClick={handleRefresh}
                            className="text-accent hover:text-accent-hover text-sm font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && liveOnlyScores.length === 0 && (
                    <div className="glass rounded-xl p-12 text-center">
                        <Wifi size={48} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">No Live Games Right Now</h3>
                        <p className="text-gray-500 text-sm max-w-md mx-auto">
                            No matches are currently in progress.
                            Check the individual sport or game pages for completed and upcoming schedules.
                        </p>
                    </div>
                )}

                {!loading && !error && liveOnlyScores.length > 0 && (
                    <div className="space-y-8">
                        {Object.entries(filteredGrouped).map(([sport, sportScores]) => {
                            if (!sportScores || sportScores.length === 0) return null;
                            return (
                                <section key={sport}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-xl">{SPORT_ICONS[sport] || '🏅'}</span>
                                        <h2 className="text-lg font-bold text-white">{sport}</h2>
                                        <span className="text-xs text-gray-500 bg-surface-700 px-2 py-0.5 rounded-full">
                                            {sportScores.length} {sportScores.length === 1 ? 'game' : 'games'}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <div className="live-dot" style={{ width: 6, height: 6 }} />
                                            <span className="text-[10px] font-bold text-live">
                                                LIVE
                                            </span>
                                        </div>
                                        <div className="flex-1 h-px bg-surface-700 ml-2" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {sportScores.map((match) => (
                                            <LiveScoreCard key={match.id} match={match} />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}

                {!loading && liveOnlyScores.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-[11px] text-gray-600 flex items-center justify-center gap-2">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-live animate-pulse" />
                            Showing only live matches • Auto-refreshing every 30 seconds
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Live;