import React, { useState, useEffect } from "react";
import { Search, Newspaper, ExternalLink } from "lucide-react";

const API_KEY = import.meta.env.VITE_NEWS_KEY;
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
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`
      );
      const data = await res.json();
      if (data.articles) {
        setNewsData(data.articles);
      } else {
        setError("No results found.");
        setNewsData([]);
      }
    } catch (err) {
      setError(`Failed to fetch news: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(DEFAULT_QUERY);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) getData();
  };

  return (
    <div className="bg-surface-900 py-8 px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Newspaper size={22} className="text-accent" />
            <div>
              <h2 className="text-xl font-bold text-white">Games Updates</h2>
              <p className="text-gray-500 text-sm mt-0.5">Latest news from the gaming world</p>
            </div>
          </div>

          <form className="flex items-center gap-2 w-full sm:w-auto" onSubmit={handleSubmit}>
            <div className="relative flex-1 sm:w-56">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search game news..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-700 text-white text-sm placeholder-gray-500 border border-white/5 focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
            {Array.from({ length: MAX_RESULTS }).map((_, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden animate-pulse">
                <div className="w-full h-40 bg-surface-600" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-surface-600 rounded w-3/4" />
                  <div className="h-3 bg-surface-600 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-8">
            <p className="text-live text-sm">{error}</p>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && (
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
            {newsData.slice(0, MAX_RESULTS).map((article, idx) => (
              <article
                key={idx}
                className="glass rounded-xl overflow-hidden flex flex-col group hover:ring-1 hover:ring-accent/30 transition-all duration-300"
              >
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title || "News image"}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-40 bg-surface-600 flex items-center justify-center">
                    <span className="text-gray-600 text-xs">No Image</span>
                  </div>
                )}
                <div className="p-4 flex flex-col flex-1">
                  <span className="font-semibold text-sm text-white line-clamp-2 mb-1">{article.title}</span>
                  <span className="text-xs text-accent mb-2">{article.source?.name}</span>
                  <span className="text-xs text-gray-500 line-clamp-2 flex-1">{article.description}</span>
                  {article.url && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-accent hover:text-accent-hover text-xs font-medium mt-3 transition-colors"
                    >
                      Read more <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesUpdates;
