import React, { useState, useEffect } from 'react';
import { Search, Newspaper } from 'lucide-react';
import NewsCard from './NewsCard';

const News = () => {
    const [search, setSearch] = useState("Sport");
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const API_KEY = import.meta.env.VITE_NEWS_KEY || "";

    const getDATA = async (query = search) => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`);
            const jsondata = await response.json();
            if (jsondata.articles) {
                setNewsData(jsondata.articles);
            } else {
                setError("No articles found.");
                setNewsData([]);
            }
        } catch (err) {
            setError(`Failed to load news: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDATA("Sport");
    }, []);

    const handleInput = (e) => setSearch(e.target.value);

    return (
        <section className="py-10 px-4 lg:px-6 max-w-[1400px] mx-auto">
            <div className="glass rounded-2xl p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Newspaper size={22} className="text-accent" />
                        <h2 className="text-xl font-bold text-white">Latest News</h2>
                    </div>

                    <form
                        className="flex items-center gap-2 w-full sm:w-auto"
                        onSubmit={e => { e.preventDefault(); getDATA(); }}
                    >
                        <div className="relative flex-1 sm:w-64">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search news..."
                                onChange={handleInput}
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

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-surface-700 rounded-xl overflow-hidden animate-pulse">
                                <div className="w-full h-40 bg-surface-600" />
                                <div className="p-4 space-y-2">
                                    <div className="h-4 bg-surface-600 rounded w-3/4" />
                                    <div className="h-3 bg-surface-600 rounded w-full" />
                                    <div className="h-3 bg-surface-600 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-8">
                        <p className="text-live text-sm">{error}</p>
                    </div>
                )}

                {/* Content */}
                {!loading && !error && <NewsCard data={newsData} />}
            </div>
        </section>
    );
};

export default News;