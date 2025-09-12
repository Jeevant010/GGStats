import React, { useState, useEffect } from "react";

const API_KEY = "a90297fb0e554032ac48ff512ced53e7";
const DEFAULT_QUERY = "games";
const MAX_RESULTS = 6;

const GamesUpdates = () => {
  const [search, setSearch] = useState(DEFAULT_QUERY);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async (query = search) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&apiKey=${API_KEY}`
      );
      const data = await res.json();

      if (data.articles) {
        setNewsData(data.articles);
      } else {
        setError("No results found.");
        setNewsData([]);
      }
    } catch (err) {
      setError(`Failed to fetch news: ${err.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(DEFAULT_QUERY);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      getData();
    }
  };

  return (
    <div className="bg-red-300 min-h-screen">
      <h1 className="text-2xl font-bold p-4">Games Updates</h1>
      <p className="p-4">
        Stay tuned for the latest updates on your favorite games! From new
        releases to exciting features, we've got you covered. Check back often
        for the freshest news and updates in the gaming world.
      </p>

      {/* Search Bar */}
      <div className="w-full max-w-full mx-auto p-4 bg-white/80 rounded-xl shadow-lg mt-8">
        <form
          className="flex flex-col sm:flex-row items-center gap-3 mb-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Search Game News"
            // value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-white shadow"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-pink-500 hover:to-red-500 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Status */}
      {loading && <p className="text-center text-lg text-blue-700">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {/* News Cards */}
      <div className="cards bg-yellow-400 grid md:grid-cols-3 sm:grid-cols-1 p-4 gap-4">
        {newsData.slice(0, MAX_RESULTS).map((article, idx) => (
          <div
            key={idx}
            className="bg-green-400 p-4 flex flex-col rounded-lg shadow"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title || "News image"}
                className="w-full object-cover rounded-md mb-2 max-h-48"
              />
            )}
            <span className="font-bold line-clamp-2">{article.title}</span>
            <span className="text-xs text-gray-700">{article.source?.name}</span>
            <span className="text-sm line-clamp-2">{article.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesUpdates;
