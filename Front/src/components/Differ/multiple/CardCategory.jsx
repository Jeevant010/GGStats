import React from "react";

const CardCategory = ({ game , onGameClick }) => (
  <div
    className="bg-white rounded-3xl shadow-lg min-w-[260px] max-w-xs w-[260px] mx-2 cursor-pointer group transition-transform duration-300 hover:scale-105 border border-gray-200"
    onClick={() => onGameClick(game.id)}
  >
    <div className="relative">
      {game.featured && (
        <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded-full shadow">
          Featured
        </div>
      )}
      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-base font-medium">Game Preview</span>
      </div>
      <div className="p-5 text-black">
        <div className="text-xs text-gray-500 mb-1">{game.title}</div>
        <div className="text-xs text-gray-500 mb-2">{game.venue}</div>
        <div className="font-semibold text-lg">{game.status}</div>
        <div className="text-xs text-gray-500 mb-1">{game.score}</div>
        <div className="text-xs text-gray-500 mb-2">{game.time}</div>
      </div>
    </div>
  </div>
);

export default CardCategory;