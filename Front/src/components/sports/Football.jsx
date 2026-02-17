import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Differ/single/Header';
import SportsType from '../SportsType';

const Football = () => {
  const [fixtures, setFixtures] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [showCount, setShowCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // commented out for api limitaion
  const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await axios.get(`https://v3.football.api-sports.io/fixtures?date=${today}`, {
          headers: {
            'x-apisports-key': API_KEY
          }
        });
        setFixtures(response.data.response);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching football fixtures", err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchFixtures();
  }, []);

  // Reset showCount when league changes
  useEffect(() => {
    setShowCount(12);
  }, [selectedLeague]);

  // Group by league
  const groupByLeague = (matches) => {
    return matches.reduce((groups, match) => {
      const league = match.league.name || "Other";
      if (!groups[league]) groups[league] = [];
      groups[league].push(match);
      return groups;
    }, {});
  };

  const groupedFixtures = groupByLeague(fixtures);
  const leagues = ["All", ...Object.keys(groupedFixtures)];
  const matchesToShow = selectedLeague === "All"
    ? fixtures
    : (groupedFixtures[selectedLeague] || []);
  const visibleMatches = matchesToShow.slice(0, showCount);

  // Status badge styling
  const getStatusStyle = (short) => {
    const live = ["1H", "2H", "HT", "ET", "BT", "P", "LIVE"];
    const finished = ["FT", "AET", "PEN"];
    const notStarted = ["NS", "TBD"];
    const cancelled = ["CANC", "PST", "SUSP", "INT", "ABD", "AWD", "WO"];

    if (live.includes(short)) return "bg-red-600 text-white animate-pulse";
    if (finished.includes(short)) return "bg-green-600/80 text-green-100";
    if (notStarted.includes(short)) return "bg-yellow-600/80 text-yellow-100";
    if (cancelled.includes(short)) return "bg-gray-600 text-gray-200";
    return "bg-gray-600 text-gray-200";
  };

  const getStatusLabel = (status) => {
    const short = status.short;
    if (["1H", "2H", "ET", "BT", "P"].includes(short)) return `🔴 LIVE (${status.elapsed}')`;
    if (short === "HT") return "Half Time";
    if (short === "FT") return "Full Time";
    if (short === "AET") return "After Extra Time";
    if (short === "PEN") return "Penalties";
    if (short === "NS") return `Kickoff ${new Date(status.elapsed || Date.now()).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
    if (short === "PST") return "Postponed";
    if (short === "CANC") return "Cancelled";
    if (short === "SUSP") return "Suspended";
    return short;
  };

  if (loading) {
    return (
      <>
        <Header />
        <SportsType />
        <div className="bg-gray-900 flex items-center justify-center p-16 min-h-screen">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="text-gray-400 text-lg">Loading today's fixtures...</div>
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
          ⚽ Football — Today's Fixtures
        </h2>

        {/* League Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center max-h-[120px] overflow-y-auto">
          {leagues.map((league) => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedLeague === league
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/30 scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
            >
              {league}
            </button>
          ))}
        </div>

        {/* Match count */}
        <p className="text-gray-500 text-sm text-center mb-4">
          Showing {visibleMatches.length} of {matchesToShow.length} fixtures
        </p>

        {/* Match Cards Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleMatches.map((match) => {
            const { fixture, league, teams, goals } = match;
            const kickoff = new Date(fixture.date).toLocaleTimeString("en-US", {
              hour: "2-digit", minute: "2-digit"
            });

            return (
              <div
                key={fixture.id}
                className="bg-gray-800/90 rounded-xl border border-gray-700/50 p-4 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
              >
                {/* League Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <img
                      src={league.logo}
                      alt={league.name}
                      className="w-5 h-5 rounded object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className="text-xs text-gray-400 truncate max-w-[140px]">
                      {league.name}
                    </span>
                    <span className="text-xs text-gray-600">• {league.country}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(fixture.status.short)}`}>
                    {getStatusLabel(fixture.status)}
                  </span>
                </div>

                {/* Teams & Score */}
                <div className="flex items-center justify-between mb-3">
                  {/* Home Team */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <img
                      src={teams.home.logo}
                      alt={teams.home.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                    />
                    <span className={`text-xs font-semibold text-center ${teams.home.winner ? 'text-green-400' : 'text-gray-300'}`}>
                      {teams.home.name}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-2 mx-2">
                    <span className={`text-2xl font-bold ${teams.home.winner ? 'text-green-400' : 'text-white'}`}>
                      {goals.home ?? '-'}
                    </span>
                    <span className="text-gray-500 text-lg">:</span>
                    <span className={`text-2xl font-bold ${teams.away.winner ? 'text-green-400' : 'text-white'}`}>
                      {goals.away ?? '-'}
                    </span>
                  </div>

                  {/* Away Team */}
                  <div className="flex flex-col items-center gap-1 flex-1">
                    <img
                      src={teams.away.logo}
                      alt={teams.away.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                    />
                    <span className={`text-xs font-semibold text-center ${teams.away.winner ? 'text-green-400' : 'text-gray-300'}`}>
                      {teams.away.name}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
                  <span>{fixture.venue?.name || 'TBD'}</span>
                  <span>{kickoff}</span>
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
              className="px-6 py-2 bg-gray-800 text-gray-300 rounded-full hover:bg-green-500 hover:text-white transition-all duration-200 border border-gray-700 hover:border-green-500"
            >
              Load More ({matchesToShow.length - showCount} remaining)
            </button>
          </div>
        )}

        {matchesToShow.length === 0 && (
          <div className="text-center text-gray-500 mt-10">No fixtures found for this league today.</div>
        )}
      </div>
    </>
  );
};

export default Football;