import React from "react";
import Header from "../components/Differ/single/Header";
import SportsType from "../components/SportsType";
import Footer from "../components/shared/Footer";
import { Radio, Zap } from "lucide-react";

const Live = () => {
    const liveMatches = [
        { sport: "Cricket", title: "IND vs AUS • 3rd ODI", score: "245/6 (39.2 ov)", venue: "SCG, Sydney", status: "Live" },
        { sport: "Football", title: "Chelsea vs Arsenal • EPL", score: "1 - 2", venue: "Stamford Bridge", status: "Live" },
        { sport: "Basketball", title: "Lakers vs Warriors • NBA", score: "89 - 82 (Q3)", venue: "Chase Center", status: "Live" },
        { sport: "Tennis", title: "Djokovic vs Alcaraz • ATP", score: "6-4, 3-5", venue: "Australian Open", status: "Live" },
        { sport: "Valorant", title: "Sentinels vs Cloud9", score: "Map 2 • 10-8", venue: "VCT Americas", status: "Live" },
        { sport: "F1", title: "Monaco Grand Prix", score: "Lap 42/78", venue: "Circuit de Monaco", status: "Live" },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            <Header />
            <SportsType />
            <main className="flex-1 py-6 px-4 lg:px-6 max-w-[1400px] mx-auto w-full">
                {/* Page Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                        <Radio size={22} className="text-live" />
                        <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-live animate-ping" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Live Now</h1>
                    <span className="text-xs text-gray-500 bg-surface-700 px-2.5 py-1 rounded-full ml-2">
                        {liveMatches.length} matches
                    </span>
                </div>

                {/* Live Match Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {liveMatches.map((match, i) => (
                        <div
                            key={i}
                            className="glass rounded-xl p-5 hover:ring-1 hover:ring-live/30 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{match.sport}</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="live-dot" />
                                    <span className="text-[10px] font-bold text-live uppercase">LIVE</span>
                                </div>
                            </div>
                            <h3 className="text-white font-semibold text-sm mb-2">{match.title}</h3>
                            <p className="text-accent font-mono font-bold text-lg mb-2">{match.score}</p>
                            <p className="text-gray-500 text-xs">{match.venue}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Live;