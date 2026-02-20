import React from 'react';
import Header from '../components/Differ/single/Header';
import GamesType from '../components/GamesType';
import HeroCarousel from '../components/shared/HeroCarousel';
// import Current from '../components/GamePageComponents/CurrentScores';
import GamesUpdates from '../components/GamePageComponents/GamesUpdates';
import Footer from '../components/shared/Footer';

const gameImages = [
  "/game4.jpg",
  "/game2.jpg",
  "/game3.jpg",
  "/game1.jpg",
  "/game5.jpg",
  "/game6.jpg",
  "/val2.jpg",
  "/omen1.png",
];

const GamesHome = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-900">
      <Header />
      <GamesType />
      <main className="flex-1">
        <HeroCarousel images={gameImages} />
        {/* <Current /> */}
        <GamesUpdates />
      </main>
      <Footer />
    </div>
  );
};

export default GamesHome;