import React from 'react';
import Header from '../../../src/components/Differ/single/Header';
import SportsType from '../SportsType';
import BigBlock from '../shared/Screen/BigBlock';

const Hockey = () => {
  const mockMatches = [
    {
      matchTitle: "Barcelona vs Real Madrid",
      venue: "Camp Nou, Barcelona",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Camp_Nou_Interior.jpg/800px-Camp_Nou_Interior.jpg",
      status: "Live",
      score: "BAR 2 - 1 RMA",
      time: "68'",
      result: null
    },
    {
      matchTitle: "Manchester United vs Liverpool",
      venue: "Old Trafford, Manchester",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Old_Trafford_inside_20060726_1.jpg",
      status: "Upcoming",
      score: null,
      time: null,
      result: null
    },
    {
      matchTitle: "Bayern Munich vs Borussia Dortmund",
      venue: "Allianz Arena, Munich",
      image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Allianz-Arena-Munich.jpg",
      status: "Completed",
      score: "FCB 3 - 2 BVB",
      time: "FT",
      result: "Bayern Munich won by 1 goal"
    },
    {
      matchTitle: "PSG vs Marseille",
      venue: "Parc des Princes, Paris",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Parc_des_Princes_Paris.jpg",
      status: "Completed",
      score: "PSG 4 - 0 MAR",
      time: "FT",
      result: "Paris Saint-Germain won by 4 goals"
    },
    {
      matchTitle: "Chelsea vs Arsenal",
      venue: "Stamford Bridge, London",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Stamford_Bridge_entrance.jpg",
      status: "Completed",
      score: "CHE 2 - 2 ARS",
      time: "FT",
      result: "Match drawn"
    },
    {
      matchTitle: "Juventus vs AC Milan",
      venue: "Allianz Stadium, Turin",
      image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Juventus_Stadium_-_Tribuna_Nord.jpg",
      status: "Completed",
      score: "JUV 1 - 0 ACM",
      time: "FT",
      result: "Juventus won by 1 goal"
    },
    {
      matchTitle: "Inter Milan vs Napoli",
      venue: "San Siro, Milan",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Stadio_San_Siro_2014.jpg",
      status: "Completed",
      score: "INT 3 - 1 NAP",
      time: "FT",
      result: "Inter Milan won by 2 goals"
    }
];


  return (
    <>
      <Header />
      <SportsType />

      <div
        className="min-h-screen w-full p-6 relative bg-[url('/src/assets/cricket1.svg')] bg-no-repeat bg-cover bg-left-center bg-green-500"
        style={{opacity:1}}
      >
        <h1 className="text-black-800 text-2xl font-bold mb-4">Football Matches</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockMatches.map((match, index) => (
            <BigBlock
              key={index}
              info={match}
              onMatchSelect={(selectedMatch) => console.log("Selected match:", selectedMatch)}
              onWatchLive={() => console.log("Opening live stream...")}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Hockey;