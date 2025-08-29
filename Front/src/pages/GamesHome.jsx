import React from 'react';
import Header from '../components/Differ/single/Header';

const GamesHome = () => {
  return (
    <>
      <div
        className="relative min-h-screen h-full w-full bg-cover bg-center bg-opacity-10"
        style={{ backgroundImage: "url('/3dcharacter1.png')" }}
      >
        
        <div className="relative z-10">
          <Header />
          <div className='bg-red-600'>GamesHome</div>
        </div>
      </div>
    </>
  );
};

export default GamesHome;