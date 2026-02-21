import React from "react";

const BigBlock = ({ info, onMatchSelect, onWatchLive }) => {
    if (!info) return null;

    const statusColor = info.status === "Live"
        ? "bg-live/10 text-live"
        : info.status === "Upcoming"
            ? "bg-upcoming/10 text-upcoming"
            : "bg-win/10 text-win";

    return (
        <div
            className="glass rounded-xl overflow-hidden cursor-pointer group hover:ring-1 hover:ring-accent/30 transition-all duration-300"
            onClick={() => onMatchSelect(info)}
        >
            {/* Match Image */}
            {info.image && (
                <div className="relative h-36 w-full overflow-hidden">
                    <img
                        src={info.image}
                        alt={info.matchTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 to-transparent" />
                    <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColor}`}>
                        {info.status === "Live" && "● "}{info.status}
                    </span>
                </div>
            )}

            {/* Match Info */}
            <div className="p-4">
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-accent transition-colors">
                    {info.matchTitle}
                </h3>
                <p className="text-gray-500 text-xs mb-2">{info.venue}</p>

                <div className="flex items-center justify-between">
                    <span className="text-accent font-mono font-bold text-base">
                        {info.score || "—"}
                    </span>
                    {info.time && (
                        <span className="text-gray-500 text-xs">{info.time}</span>
                    )}
                </div>

                {info.status === "Completed" && info.result && (
                    <p className="text-gray-500 text-xs mt-2 pt-2 border-t border-white/5">{info.result}</p>
                )}

                {info.status === "Live" && (
                    <button
                        className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-live/10 text-live text-xs font-medium hover:bg-live/20 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onWatchLive();
                        }}
                    >
                        <span className="live-dot" style={{ width: 6, height: 6 }} />
                        Watch Live
                    </button>
                )}
            </div>
        </div>
    );
};

export default BigBlock;