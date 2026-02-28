import React, { useState } from "react";
import Header from "../components/Differ/single/Header";
import SportsType from "../components/SportsType";
import Footer from "../components/shared/Footer";
import LiveScoreCard from "../components/LiveScoreCard";
import DatePicker from "../components/DatePicker";
import useLiveScores from "../hooks/useLiveScores";
import { CalendarDays, RefreshCw, WifiOff, Clock, Filter, Trophy } from "lucide-react";

const SPORT_ICONS = {
    Basketball: '🏀',
    Football: '🏈',
    Soccer: '⚽',
    Cricket: '🏏',
    Baseball: '⚾',
    Hockey: '🏒',
    Tennis: '🎾',
};

const Scores = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { scores, groupedScores, availableSports, loading, error, lastUpdated, refresh, isToday } =
        useLiveScores(selectedDate);
    const [activeFilter, setActiveFilter] = useState('All');
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        refresh();
        setTimeout(() => setRefreshing(false), 1000);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setActiveFilter('All');
    };

    // Filter scores by sport
    const filteredGrouped =
        activeFilter === 'All'
            ? groupedScores
            : { [activeFilter]: groupedScores[activeFilter] || [] };

    const totalMatches = activeFilter === 'All'
        ? scores.length
        : (groupedScores[activeFilter] || []).length;

    // Format the date label
    const dateLabel = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            <Header />
            <SportsType />
            <main className="flex-1 py-6 px-4 lg:px-6 max-w-[1400px] mx-auto w-full">
                {/* Page Header */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <CalendarDays size={22} className="text-accent" />
                            <h1 className="text-2xl font-bold text-white">Scores & Results</h1>
                            {!loading && (
                                <span className="text-xs text-gray-500 bg-surface-700 px-2.5 py-1 rounded-full ml-1">
                                    {totalMatches} {totalMatches === 1 ? 'match' : 'matches'}
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

                    {/* Date Picker Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />
                        <p className="text-sm text-gray-400">
                            📅 {dateLabel}
                        </p>
                    </div>
                </div>

                {/* Sport Filter Tabs */}
                {availableSports.length > 1 && (
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                        <Filter size={14} className="text-gray-500 flex-shrink-0" />
                        <button
                            onClick={() => setActiveFilter('All')}
                            className={`sport-filter-tab ${activeFilter === 'All' ? 'active' : ''}`}
                        >
                            All Sports
                        </button>
                        {availableSports.map((sport) => (
                            <button
                                key={sport}
                                onClick={() => setActiveFilter(sport)}
                                className={`sport-filter-tab ${activeFilter === sport ? 'active' : ''}`}
                            >
                                <span>{SPORT_ICONS[sport] || '🏅'}</span>
                                {sport}
                                <span className="text-[10px] opacity-60">
                                    ({groupedScores[sport]?.length || 0})
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

                {/* Empty State */}
                {!loading && !error && scores.length === 0 && (
                    <div className="glass rounded-xl p-12 text-center">
                        <Trophy size={48} className="text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">No Games Found</h3>
                        <p className="text-gray-500 text-sm max-w-md mx-auto">
                            No games were found for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
                            Try selecting a different date.
                        </p>
                    </div>
                )}

                {/* Scores Grid by Sport */}
                {!loading && !error && scores.length > 0 && (
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

                {/* Footer info */}
                {!loading && scores.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-[11px] text-gray-600">
                            Showing results for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • Powered by ESPN
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Scores;
