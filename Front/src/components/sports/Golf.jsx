import React, { useState, useEffect } from 'react';
import Header from '../Differ/single/Header';
import SportsType from '../SportsType';
import Footer from '../shared/Footer';
import { Loader } from 'lucide-react';

const Golf = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Replace with your actual Golf API call
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface-900">
      <Header />
      <SportsType />
      <main className="flex-1 py-6 px-4 lg:px-6 max-w-[1400px] mx-auto w-full">
        <h1 className="text-2xl font-bold text-white mb-6">⛳ Golf</h1>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader size={24} className="animate-spin text-accent" />
          </div>
        )}

        {error && (
          <div className="text-live text-sm bg-live/10 px-6 py-4 rounded-xl border border-live/30 text-center">
            {error}
          </div>
        )}

        {!loading && !error && matches.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No tournaments available.</p>
            <p className="text-gray-600 text-sm mt-2">Connect an API to display live golf data.</p>
          </div>
        )}

        {matches.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {matches.map((match, i) => (
              <div key={match.id || i} className="glass rounded-xl p-4">
                <p className="text-white font-medium">{match.title || 'Tournament'}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Golf;