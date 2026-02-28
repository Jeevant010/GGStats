import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Differ/single/Header';
import SportsType from '../SportsType';
import Footer from '../shared/Footer';
import DatePicker from '../DatePicker';

const Baseball = () => {
  const [games, setGames] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState("All");
  const [showCount, setShowCount] = useState(12);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const API_KEY = import.meta.env.VITE_SPORTS_API_KEY;

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await axios.get(`https://v1.baseball.api-sports.io/games?date=${dateStr}`, {
          headers: { 'x-apisports-key': API_KEY }
        });
        setGames(response.data.response);
      } catch (err) {
        console.error("Error fetching baseball games", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [selectedDate]);

  useEffect(() => { setShowCount(12); }, [selectedLeague]);

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
  const gamesToShow = selectedLeague === "All" ? games : (groupedGames[selectedLeague] || []);
  const visibleGames = gamesToShow.slice(0, showCount);

  const getStatusStyle = (status) => {
    if (!status?.short) return "bg-gray-600 text-gray-200";
    const s = status.short;
    const live = ["IN", "LIVE"];
    const finished = ["FT", "POST"];
    const notStarted = ["NS"];
    if (live.includes(s)) return "bg-live/20 text-live animate-pulse";
    if (finished.includes(s)) return "bg-win/20 text-win";
    if (notStarted.includes(s)) return "bg-upcoming/20 text-upcoming";
    return "bg-surface-500 text-gray-300";
  };

  const getStatusLabel = (status) => {
    if (!status?.short) return "TBD";
    const s = status.short;
    if (s === "IN") return `🔴 Inning ${status.timer || ''}`;
    if (s === "FT") return "Final";
    if (s === "POST") return "Postponed";
    if (s === "CANC") return "Cancelled";
    if (s === "NS") return "Not Started";
    return status.long || s;
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-900">
      <Header />
      <SportsType />
      <main className="flex-1 w-full text-white py-6 px-4 lg:px-6 max-w-[1400px] mx-auto">
        <div className="flex flex-col items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-center tracking-wide">
            ⚾ Baseball — {selectedDate.toDateString() === new Date().toDateString() ? "Today's" : selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} Games
          </h2>
          <DatePicker selectedDate={selectedDate} onDateChange={(d) => { setSelectedDate(d); setSelectedLeague('All'); }} />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <div className="text-gray-400 text-lg">Loading today's games...</div>
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
            <div className="flex flex-wrap gap-2 mb-6 justify-center max-h-[120px] overflow-y-auto">
              {leagues.map((league) => (
                <button
                  key={league}
                  onClick={() => setSelectedLeague(league)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${selectedLeague === league
                    ? "bg-accent/15 text-accent border border-accent/30"
                    : "bg-surface-700 text-gray-400 hover:bg-surface-600 hover:text-white border border-transparent"
                    }`}
                >
                  {league}
                </button>
              ))}
            </div>

            <p className="text-gray-500 text-sm text-center mb-4">
              Showing {visibleGames.length} of {gamesToShow.length} games
            </p>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visibleGames.map((game) => {
                const kickoff = new Date(game.date).toLocaleTimeString("en-US", {
                  hour: "2-digit", minute: "2-digit"
                });
                const homeScore = game.scores?.home?.total;
                const awayScore = game.scores?.away?.total;
                const homeWon = homeScore != null && awayScore != null && homeScore > awayScore;
                const awayWon = homeScore != null && awayScore != null && awayScore > homeScore;

                return (
                  <div key={game.id} className="glass rounded-xl p-4 hover:ring-1 hover:ring-accent/30 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
                      <div className="flex items-center gap-2">
                        {game.league?.logo && (
                          <img src={game.league.logo} alt={game.league.name} className="w-5 h-5 rounded object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                        )}
                        <span className="text-xs text-gray-400 truncate max-w-[130px]">{game.league?.name}</span>
                        {game.country?.name && <span className="text-xs text-gray-600">• {game.country.name}</span>}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusStyle(game.status)}`}>
                        {getStatusLabel(game.status)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <img src={game.teams?.home?.logo} alt={game.teams?.home?.name} className="w-10 h-10 object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} />
                        <span className={`text-xs font-semibold text-center ${homeWon ? 'text-win' : 'text-gray-300'}`}>{game.teams?.home?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mx-2">
                        <span className={`text-2xl font-bold ${homeWon ? 'text-win' : 'text-white'}`}>{homeScore ?? '-'}</span>
                        <span className="text-gray-500 text-lg">:</span>
                        <span className={`text-2xl font-bold ${awayWon ? 'text-win' : 'text-white'}`}>{awayScore ?? '-'}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <img src={game.teams?.away?.logo} alt={game.teams?.away?.name} className="w-10 h-10 object-contain" onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} />
                        <span className={`text-xs font-semibold text-center ${awayWon ? 'text-win' : 'text-gray-300'}`}>{game.teams?.away?.name}</span>
                      </div>
                    </div>

                    {/* Innings breakdown */}
                    {game.scores?.home?.innings && (
                      <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 mb-2">
                        {Object.entries(game.scores.home.innings).map(([inning, homeRuns]) => (
                          homeRuns != null && (
                            <span key={inning}>
                              I{inning}: {homeRuns}-{game.scores.away.innings[inning] ?? 0}
                            </span>
                          )
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/50">
                      <span>{game.league?.season || ''}</span>
                      <span>{kickoff}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {showCount < gamesToShow.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowCount(prev => prev + 12)}
                  className="px-6 py-2 bg-surface-700 text-gray-300 rounded-full hover:bg-accent hover:text-white transition-all duration-200 border border-white/5 hover:border-accent"
                >
                  Load More ({gamesToShow.length - showCount} remaining)
                </button>
              </div>
            )}

            {gamesToShow.length === 0 && (
              <div className="text-center text-gray-500 mt-10">No games found for this league today.</div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Baseball;
