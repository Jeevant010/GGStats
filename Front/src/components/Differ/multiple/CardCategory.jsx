// import React from "react";
// import { Trophy } from "lucide-react";

// const CardCategory = ({ game, onGameClick }) => (
//   <div
//     className="glass rounded-xl min-w-[240px] max-w-[260px] w-[260px] mx-1 cursor-pointer group transition-all duration-300 hover:ring-1 hover:ring-accent/30 hover:scale-[1.02]"
//     onClick={() => onGameClick(game.id)}
//   >
//     <div className="relative">
//       {game.featured && (
//         <div className="absolute top-3 left-3 flex items-center gap-1 bg-accent/90 text-white px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full z-10">
//           <Trophy size={10} />
//           Featured
//         </div>
//       )}
//       <div className="w-full h-40 bg-gradient-to-br from-surface-600 to-surface-700 flex items-center justify-center rounded-t-xl overflow-hidden">
//         <span className="text-gray-500 text-sm font-medium">Game Preview</span>
//       </div>
//       <div className="p-4">
//         <div className="text-xs text-gray-500 mb-0.5">{game.title}</div>
//         <div className="text-xs text-gray-600 mb-2">{game.venue}</div>
//         <div className="font-semibold text-base text-white">{game.status}</div>
//         <div className="text-xs text-accent mt-1">{game.score}</div>
//         <div className="text-xs text-gray-500">{game.time}</div>
//       </div>
//     </div>
//   </div>
// );

// export default CardCategory;