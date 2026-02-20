// import React, { useRef, useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
// import Valorant from "../Games/Valorant";

// const games = [
//   "All Games", "Valorant", "CS:GO", "League of Legends", "Dota 2",
//   "Overwatch", "Fortnite", "Apex Legends", "Rainbow Six Siege",
//   "Call of Duty", "Rocket League", "PUBG", "Hearthstone", "StarCraft II",
// ];

// const tournaments = [
//   "Ongoing Tournaments", "Upcoming Tournaments", "Past Tournaments",
//   "Local Tournaments", "International Tournaments", "Online Tournaments",
// ];

// const CurrentScores = () => {
//   const gamesRef = useRef(null);
//   const [selectedGame, setSelectedGame] = useState("All Games");

//   const scroll = (ref, dir) => {
//     ref.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
//   };

//   const renderGameContent = () => {
//     switch (selectedGame) {
//       case "Valorant":
//         return <Valorant />;
//       default:
//         return (
//           <div className="flex flex-col lg:flex-row gap-4 p-4">
//             {/* Score Cards */}
//             <div className="glass rounded-xl p-5 flex-1">
//               {/* Tournament Tabs */}
//               <div className="relative mb-6">
//                 <div className="flex gap-2 overflow-x-auto pb-2">
//                   {tournaments.map((tour, idx) => (
//                     <button
//                       key={idx}
//                       className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap bg-surface-700 text-gray-400 hover:text-white hover:bg-surface-600 transition-colors shrink-0"
//                     >
//                       {tour}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Match Cards */}
//               <div className="space-y-3">
//                 {[
//                   { title: "Team Alpha vs Team Beta", score: "13 - 11", status: "Completed", map: "Ascent" },
//                   { title: "Cloud9 vs Sentinels", score: "2 - 1", status: "Live", map: "Haven" },
//                   { title: "Fnatic vs LOUD", score: "0 - 0", status: "Upcoming", map: "TBD" },
//                   { title: "NRG vs DRX", score: "1 - 2", status: "Completed", map: "Pearl" },
//                 ].map((match, i) => (
//                   <div key={i} className="flex items-center justify-between p-4 bg-surface-700 rounded-lg hover:bg-surface-600 transition-colors cursor-pointer">
//                     <div>
//                       <p className="text-white text-sm font-medium">{match.title}</p>
//                       <p className="text-gray-500 text-xs mt-0.5">Map: {match.map}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-white font-mono font-bold text-sm">{match.score}</p>
//                       <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${match.status === "Live" ? "bg-live/10 text-live" :
//                           match.status === "Upcoming" ? "bg-upcoming/10 text-upcoming" :
//                             "bg-win/10 text-win"
//                         }`}>
//                         {match.status === "Live" && "● "}{match.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Match Details */}
//             <div className="glass rounded-xl p-5 lg:w-[350px]">
//               <h3 className="text-white font-semibold mb-4 text-sm">Match Details</h3>
//               <div className="flex flex-col items-center justify-center h-[200px] text-gray-500 text-sm">
//                 <Zap size={32} className="mb-3 text-surface-500" />
//                 <p>Select a match to view details</p>
//               </div>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="bg-surface-900 w-full">
//       {/* Header */}
//       <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
//         <div className="live-dot" />
//         <h2 className="text-lg font-bold text-white">Live Scores</h2>
//       </div>

//       {/* Games Tabs */}
//       <div className="relative border-b border-white/5">
//         <button
//           className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-surface-800/90 text-gray-400 hover:text-white z-10"
//           onClick={() => scroll(gamesRef, -1)}
//         >
//           <ChevronLeft size={16} />
//         </button>
//         <div
//           ref={gamesRef}
//           className="flex gap-1 px-10 py-2 overflow-x-auto scroll-smooth"
//         >
//           {games.map((game, idx) => (
//             <button
//               key={idx}
//               onClick={() => setSelectedGame(game)}
//               className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${selectedGame === game
//                   ? "bg-accent/15 text-accent border border-accent/30"
//                   : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
//                 }`}
//             >
//               {game}
//             </button>
//           ))}
//         </div>
//         <button
//           className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-surface-800/90 text-gray-400 hover:text-white z-10"
//           onClick={() => scroll(gamesRef, 1)}
//         >
//           <ChevronRight size={16} />
//         </button>
//       </div>

//       {/* Content */}
//       {renderGameContent()}
//     </div>
//   );
// };

// export default CurrentScores;
