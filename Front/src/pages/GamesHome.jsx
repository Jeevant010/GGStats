import React from 'react';
import Header from '../components/Differ/single/Header';
import Hero from '../components/GamePageComponents/Hero';
import Current from '../components/GamePageComponents/CurrentScores'
const GamesHome = () => {
  return (
    <>
      <Header />
      {/* <div
        className="relative min-h-screen h-full w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/3dcharacter1.png')" }}
      > */}
        <Hero />
        <Current />
  
      {/* </div> */}
    </>
  );
};

export default GamesHome;