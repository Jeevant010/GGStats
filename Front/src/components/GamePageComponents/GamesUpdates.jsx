import { useState, useEffect } from 'react';

const GamesUpdates = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Access the API key from environment variables
  const API_KEY = import.meta.env.VITE_API_UPDATE_NEWS;
  
  const getData = async (query = 'games') => {
    if (!API_KEY) {
      console.warn('API key missing, using mock data');
      setNewsData([
        { title: "Mock Game News 1", description: "This is a placeholder.", source: { name: "Local" }, image: "" },
        { title: "Mock Game News 2", description: "Another placeholder.", source: { name: "Local" }, image: "" }
      ]);
      return;
    }


    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=5&apikey=${API_KEY}`
      );

      if (!response.ok) {
        const text = await response.text().catch(() => response.statusText || '');
        throw new Error(`News fetch failed: ${response.status} ${text}`);
      }

      const jsondata = await response.json();
      setNewsData(jsondata.articles || []);
    } catch (err) {
      console.error('News fetch error', err);
      setError(err.message || 'Fetch error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData('games');
  }, []);

  return (
    <div className="bg-red-300">
      <h1 className="text-2xl font-bold p-4">Games Updates</h1>
      <p className="p-4">
        Stay tuned for the latest updates on your favorite games! From new releases to exciting
        features, we've got you covered.
      </p>

      {error && <div className="p-4 text-red-700">Error: {error}</div>}
      {loading && <div className="p-4">Loading...</div>}

      <div className="cards bg-yellow-400 grid md:grid-cols-3 sm:grid-cols-1 p-4 gap-4">
        {newsData.length === 0 && !loading && !error && (
          <div className="p-4">No news found.</div>
        )}

        {newsData.slice(0, 6).map((article, idx) => (
          <div key={idx} className="bg-green-400 p-4 flex flex-col">
            {article.image ? (
              <img src={article.image} alt={article.title} className="w-full object-cover mb-2" />
            ) : (
              <div className="w-full h-32 bg-gray-200 mb-2 flex items-center justify-center text-sm">
                No image
              </div>
            )}
            <span className="font-bold">{article.title}</span>
            <span className="text-xs">{article.source?.name}</span>
            <span className="text-sm line-clamp-2">{article.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesUpdates;