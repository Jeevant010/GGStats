import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Differ/single/Header';
import SportsType from '../SportsType';

const Basketball = () => {
  const [games, setGames] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [showCount, setShowCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`https://v1.basketball.api-sports.io/games?date=${today}`, {
          headers: {
            'x-apisports-key': API_KEY
          }
        });
        setGames(response.data.response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching basketball games", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Reset showCount when league changes
  useEffect(() => {
    setShowCount(12);
  }, [selectedLeague]);

  // Group by league
  const groupByLeague = (gamesList) => {
    return gamesList.reduce((groups, game) => {
      const league = game.league?.name || "Other";
      if (!groups[league]) groups[league] = [];
      groups[league].push(game);
      return groups;
    }, {});
  };

  const groupedGames = groupByLeague(games);
  const leagues = ["All", ...Object.keys(groupedGames)];
  const gamesToShow = selectedLeague === "All"
    ? games
    : (groupedGames[selectedLeague] || []);
  const visibleGames = gamesToShow.slice(0, showCount);

  // Status styling
  const getStatusStyle = (status) => {
    if (!status?.short) return "bg-gray-600 text-gray-200";
    const s = status.short;
    const live = ["Q1", "Q2", "Q3", "Q4", "OT", "BT", "HT"];
    const finished = ["FT", "AOT", "AP"];
    const notStarted = ["NS"];

    if (live.includes(s)) return "bg-red-600 text-white animate-pulse";
    if (finished.includes(s)) return "bg-green-600/80 text-green-100";
    if (notStarted.includes(s)) return "bg-yellow-600/80 text-yellow-100";
    return "bg-gray-600 text-gray-200";
  };

  const getStatusLabel = (status) => {
    if (!status?.short) return "TBD";
    const s = status.short;
    if (["Q1", "Q2", "Q3", "Q4"].includes(s)) return `🔴 ${s} (${status.timer || ''})`;
    if (s === "OT") return "🔴 Overtime";
    if (s === "HT" || s === "BT") return "Half Time";
    if (s === "FT") return "Full Time";
    if (s === "AOT" || s === "AP") return "After OT";
    if (s === "NS") return "Not Started";
    if (s === "CANC") return "Cancelled";
    if (s === "PST") return "Postponed";
    return status.long || s;
  };

  if (loading) {
    return (
      <>
        <Header />
        <SportsType />
        <div className="bg-gray-900 flex items-center justify-center p-16 min-h-screen">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-gray-400 text-lg">Loading today's games...</div>
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
          🏀 Basketball — Today's Games
        </h2>

        {/* League Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center max-h-[120px] overflow-y-auto">
          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedLeague === league
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {league}
            </button>
          ))}
        </div>

        {/* Game count */}
        <p className="text-gray-500 text-sm text-center mb-4">
          Showing {visibleGames.length} of {gamesToShow.length} games
        </p>

        {/* Game Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleGames.map((game) => {
            const kickoff = new Date(game.date).toLocaleTimeString("en-US", {
              hour: "2-digit", minute: "2-digit"
            });
            const homeTotal = game.scores?.home?.total;
            const awayTotal = game.scores?.away?.total;
            const homeWon = homeTotal != null && awayTotal != null && homeTotal > awayTotal;
            const awayWon = homeTotal != null && awayTotal != null && awayTotal > homeTotal;

            return (
              <div
                key={game.id}
                className="bg-gray-800/90 rounded-xl border border-gray-700/50 p-4 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300"
              >
                {/* League Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
                  <div className="flex items-center gap-2">
                    {game.league?.logo && (
                      <img
                        src={game.league.logo}
                        alt={game.league.name}
                        className="w-5 h-5 rounded object-contain"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    )}
                    <span className="text-xs text-gray-400 truncate max-w-[130px]">
                      {game.league?.name}
                    </span>
                    {game.country?.name && (
                      <span className="text-xs text-gray-600">• {game.country.name}</span>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(game.status)}`}>
                    {getStatusLabel(game.status)}
                  </span>
                </div>

                {/* Teams & Score */}
                <div className="flex items-center justify-between mb-3">
                  {/* Home Team */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <img
                      src={game.teams?.home?.logo}
                      alt={game.teams?.home?.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                    />
                    <span className={`text-xs font-semibold text-center ${homeWon ? 'text-orange-400' : 'text-gray-300'}`}>
                      {game.teams?.home?.name}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-2 mx-2">
                    <span className={`text-2xl font-bold ${homeWon ? 'text-orange-400' : 'text-white'}`}>
                      {homeTotal ?? '-'}
                    </span>
                    <span className="text-gray-500 text-lg">:</span>
                    <span className={`text-2xl font-bold ${awayWon ? 'text-orange-400' : 'text-white'}`}>
                      {awayTotal ?? '-'}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <img
                      src={game.teams?.away?.logo}
                      alt={game.teams?.away?.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                    />
                    <span className={`text-xs font-semibold text-center ${awayWon ? 'text-orange-400' : 'text-gray-300'}`}>
                      {game.teams?.away?.name}
                    </span>
                  </div>
                </div>

                {/* Quarter Scores */}
                {game.scores?.home?.quarter_1 != null && (
                  <div className="flex justify-center gap-3 text-xs text-gray-500 mb-2">
                    <span>Q1: {game.scores.home.quarter_1}-{game.scores.away.quarter_1}</span>
                    {game.scores.home.quarter_2 != null && (
                      <span>Q2: {game.scores.home.quarter_2}-{game.scores.away.quarter_2}</span>
                    )}
                    {game.scores.home.quarter_3 != null && (
                      <span>Q3: {game.scores.home.quarter_3}-{game.scores.away.quarter_3}</span>
                    )}
                    {game.scores.home.quarter_4 != null && (
                      <span>Q4: {game.scores.home.quarter_4}-{game.scores.away.quarter_4}</span>
                    )}
                    {game.scores.home.over_time != null && (
                      <span className="text-orange-400">OT: {game.scores.home.over_time}-{game.scores.away.over_time}</span>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
                  <span>{game.league?.season || ''}</span>
                  <span>{kickoff}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More */}
        {showCount < gamesToShow.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowCount(prev => prev + 12)}
              className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-200 border border-gray-700 hover:border-orange-500"
            >
              Load More ({gamesToShow.length - showCount} remaining)
            </button>
          </div>
        )}

        {gamesToShow.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No games found for this league today.</div>
        )}
      </div>
    </>
  );
};

export default Basketball;