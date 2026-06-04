import React from 'react';

const LiveScoreCard = ({ match }) => {
    const isLive = match.gameState === 'live';
    const isFinal = match.gameState === 'final';
    const isScheduled = match.gameState === 'scheduled';

    return (
        <div
            className={`glass rounded-xl p-5 transition-all duration-300 cursor-pointer group relative overflow-hidden
        ${isLive ? 'hover:ring-1 hover:ring-live/40 live-card-glow' : 'hover:ring-1 hover:ring-accent/20'}
      `}
        >
            {/* Top Row: League + Status */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-base">{match.sportIcon}</span>
                    <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        {match.league}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    {isLive && (
                        <>
                            <div className="live-dot" />
                            <span className="text-[10px] font-bold text-live uppercase tracking-wide">LIVE</span>
                        </>
                    )}
                    {isFinal && (
                        <span className="text-[10px] font-bold text-gray-400 uppercase bg-surface-700 px-2 py-0.5 rounded-full">
                            Final
                        </span>
                    )}
                    {isScheduled && (
                        <span className="text-[10px] font-bold text-upcoming uppercase bg-surface-700 px-2 py-0.5 rounded-full">
                            Upcoming
                        </span>
                    )}
                </div>
            </div>

            {/* Teams & Scores */}
            <div className="space-y-3">
                {/* Away Team */}
                <TeamRow
                    team={match.awayTeam}
                    isWinning={
                        !isScheduled && Number(match.awayTeam.score) > Number(match.homeTeam.score)
                    }
                    isLive={isLive}
                    isScheduled={isScheduled}
                />

                {/* Divider with status */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-surface-600" />
                    <span
                        className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full
              ${isLive ? 'text-live bg-live/10' : 'text-gray-500 bg-surface-700'}
            `}
                    >
                        {match.statusDetail}
                    </span>
                    <div className="flex-1 h-px bg-surface-600" />
                </div>

                {/* Home Team */}
                <TeamRow
                    team={match.homeTeam}
                    isWinning={
                        !isScheduled && Number(match.homeTeam.score) > Number(match.awayTeam.score)
                    }
                    isLive={isLive}
                    isScheduled={isScheduled}
                />
            </div>

            {/* Bottom: Venue & Broadcast */}
            {(match.venue || match.broadcast) && (
                <div className="mt-4 pt-3 border-t border-surface-600/50 flex items-center justify-between">
                    {match.venue && (
                        <span className="text-[10px] text-gray-500 truncate max-w-[60%]">
                            📍 {match.venue}
                        </span>
                    )}
                    {match.broadcast && (
                        <span className="text-[10px] text-gray-500 truncate max-w-[35%]">
                            📺 {match.broadcast}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

const TeamRow = ({ team, isWinning, isLive, isScheduled }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Team Logo */}
                <div className="w-8 h-8 rounded-full bg-surface-600/50 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {team.logo ? (
                        <img
                            src={team.logo}
                            alt={team.name}
                            className="w-7 h-7 object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                    ) : null}
                    <span
                        className={`text-xs font-bold text-gray-400 ${team.logo ? 'hidden' : 'flex'}`}
                        style={{ display: team.logo ? 'none' : 'flex' }}
                    >
                        {team.abbreviation?.slice(0, 3) || '?'}
                    </span>
                </div>

                {/* Team Info */}
                <div className="min-w-0">
                    <p
                        className={`text-sm font-semibold truncate ${isWinning ? 'text-white' : 'text-gray-300'
                            }`}
                    >
                        {team.name}
                    </p>
                    {team.record && (
                        <p className="text-[10px] text-gray-500 font-mono">{team.record}</p>
                    )}
                </div>
            </div>

            {/* Score */}
            {!isScheduled && (
                <span
                    className={`text-xl font-mono font-bold tabular-nums ml-3 ${isWinning
                            ? isLive
                                ? 'text-live'
                                : 'text-white'
                            : 'text-gray-500'
                        }`}
                >
                    {team.score}
                </span>
            )}
        </div>
    );
};

export default LiveScoreCard;
