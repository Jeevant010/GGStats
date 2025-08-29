import React from 'react';
import Header from '../components/Differ/single/Header';

const GamesHome = () => {
  return (
    <>
      <Header />
    <div className='bg-black opacity-100'>
      <div
        className="relative min-h-screen h-full w-full bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/3dcharacter1.png')" }}
      >
        
        <div className="relative z-10">
          <h1 className="text-white text-4xl font-bold">Games Home</h1>
        </div>
      </div>
      </div>
    </>
  );
};

export default GamesHome;