import React from 'react';
import Header from '../components/Differ/single/Header';
import GamesType from '../components/GamesType';
import HeroCarousel from '../components/shared/HeroCarousel';
// import Current from '../components/GamePageComponents/CurrentScores';
// import GamesUpdates from '../components/GamePageComponents/GamesUpdates';
import Footer from '../components/shared/Footer';
import useBannerImages from '../hooks/useBannerImages';

const GamesHome = () => {
  const { images: gameImages, loading } = useBannerImages("games");

  return (
    <div className="min-h-screen flex flex-col bg-surface-900">
      <Header />
      <GamesType />
      <main className="flex-1">
        <HeroCarousel images={gameImages} loading={loading} />
        {/* <Current /> */}
        {/* <GamesUpdates /> */}
      </main>
      <Footer />
    </div>
  );
};

export default GamesHome;