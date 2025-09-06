import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CurrentScores = () => {
  const gamesRef = useRef(null);
  const tourRef = useRef(null);

  const [gamesScroll, setGamesScroll] = useState({ left: false, right: false });
  const [tourScroll, setTourScroll] = useState({ left: false, right: false });

  const checkScroll = (ref, setState) => {
    if (!ref.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = ref.current;

    setState({
      left: scrollLeft > 0,
      right: scrollLeft + clientWidth < scrollWidth,
    });
  };

  useEffect(() => {
    checkScroll(gamesRef, setGamesScroll);
    checkScroll(tourRef, setTourScroll);

    const handleResize = () => {
      checkScroll(gamesRef, setGamesScroll);
      checkScroll(tourRef, setTourScroll);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = (ref, setState) => {
    ref.current.scrollBy({ left: -200, behavior: "smooth" });
    setTimeout(() => checkScroll(ref, setState), 300);
  };

  const scrollRight = (ref, setState) => {
    ref.current.scrollBy({ left: 200, behavior: "smooth" });
    setTimeout(() => checkScroll(ref, setState), 300);
  };

  return (
    <div className="bg-blue-200 w-full min-h-screen">
      <div className="heading text-3xl font-bold text-white p-4 bg-yellow-300">
        Live Scores
      </div>

      {/* Games Category with Arrows */}
      <div className="relative">
        {gamesScroll.left && (
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 z-10"
            onClick={() => scrollLeft(gamesRef, setGamesScroll)}
          > 
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        <div
          ref={gamesRef}
          onScroll={() => checkScroll(gamesRef, setGamesScroll)}
          className="games-category bg-zinc-800 flex p-2  overflow-x-auto whitespace-nowrap scroll-smooth"
        >
          {[
            "All Games",
            "Valorant",
            "CS:GO",
            "League of Legends",
            "Dota 2",
            "Overwatch",
            "Fortnite",
            "Apex Legends",
            "Rainbow Six Siege",
            "Call of Duty",
            "Rocket League",
            "PUBG",
            "Hearthstone",
            "StarCraft II",
          ].map((game, idx) => (
            <button
              key={idx}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4"
            >
              {game}
            </button>
          ))}
        </div>
        {gamesScroll.right && (
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 z-10"
            onClick={() => scrollRight(gamesRef, setGamesScroll)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Scores Section */}
      <div className="flex flex-col md:flex-row bg-blue-800">
        {/* Tournaments with arrows */}
        <div className="score-cards bg-green-300 rounded-lg shadow-lg p-6 m-4 h-full md:w-1/2 relative">
          {tourScroll.left && (
            <button
              className="absolute left-0 top-10 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 z-10"
              onClick={() => scrollLeft(tourRef, setTourScroll)}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          <div
            ref={tourRef}
            onScroll={() => checkScroll(tourRef, setTourScroll)}
            className="tournaments flex p-1 overflow-x-auto whitespace-nowrap bg-white scroll-smooth"
          >
            {[
              "Ongoing Tournaments",
              "Upcoming Tournaments",
              "Past Tournaments",
              "Local Tournaments",
              "International Tournaments",
              "Online Tournaments",
            ].map((tour, idx) => (
              <button
                key={idx}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-4"
              >
                {tour}
              </button>
            ))}
          </div>
          {tourScroll.right && (
            <button
              className="absolute right-0 top-10 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 z-10"
              onClick={() => scrollRight(tourRef, setTourScroll)}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Example cards */}
          <div className="card-1 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Game 1</h2>
            <p className="text-xl">Score</p>
          </div>
          <div className="card-2 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Game 2</h2>
            <p className="text-xl">Score</p>
          </div>
          <div className="card-3 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Game 3</h2>
            <p className="text-xl">Score</p>
          </div>
          <div className="card-4 mb-12">
            <h2 className="text-2xl font-semibold mb-4">Game 4</h2>
            <p className="text-xl">Score</p>
          </div>
        </div>

        {/* Match Details */}
        <div className="score-cards bg-zinc-600 rounded-lg shadow-lg p-6 m-4 h-full md:w-1/2 ">
          <p>Display selected match details </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentScores;
