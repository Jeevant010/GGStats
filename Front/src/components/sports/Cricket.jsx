import React from 'react';
import Header from '../../../src/components/Differ/single/Header';
import SportsType from '../SportsType';
import BigBlock from '../shared/Screen/BigBlock';

const Cricket = () => {
  const mockMatch = [
    {
      matchTitle: "India vs Australia",
      venue: "Melbourne Cricket Ground",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/72/India_vs_Australia_Cricket_Match.jpg",
      status: "Live",
      score: "IND 245/6",
      overs: "45.3",
      result: null
    },
    {
      matchTitle: "England vs South Africa",
      venue: "Lord's, London",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/81/Cricket_match_in_progress.jpg",
      status: "Upcoming",
      score: null,
      overs: null,
      result: null
    },
    {
      matchTitle: "Pakistan vs New Zealand",
      venue: "Karachi National Stadium",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Cricket_field_and_pitch.jpg",
      status: "Completed",
      score: "NZ 320/7",
      overs: "50.0",
      result: "New Zealand won by 15 runs"
    },
    {
      matchTitle: "Pakistan vs New Zealand",
      venue: "Karachi National Stadium",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Cricket_field_and_pitch.jpg",
      status: "Completed",
      score: "NZ 320/7",
      overs: "50.0",
      result: "New Zealand won by 15 runs"
    },
    {
      matchTitle: "Pakistan vs New Zealand",
      venue: "Karachi National Stadium",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Cricket_field_and_pitch.jpg",
      status: "Completed",
      score: "NZ 320/7",
      overs: "50.0",
      result: "New Zealand won by 15 runs"
    },
    {
      matchTitle: "Pakistan vs New Zealand",
      venue: "Karachi National Stadium",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Cricket_field_and_pitch.jpg",
      status: "Completed",
      score: "NZ 320/7",
      overs: "50.0",
      result: "New Zealand won by 15 runs"
    },
    {
      matchTitle: "Pakistan vs New Zealand",
      venue: "Karachi National Stadium",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/05/Cricket_field_and_pitch.jpg",
      status: "Completed",
      score: "NZ 320/7",
      overs: "50.0",
      result: "New Zealand won by 15 runs"
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
        <h1 className="text-black-800 text-2xl font-bold mb-4">Cricket Matches</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockMatch.map((match, index) => (
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

export default Cricket;