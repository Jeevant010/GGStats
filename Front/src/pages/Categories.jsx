import React, { useState, useEffect } from 'react';

import SmallCategory from '../components/Differ/single/SmallCategory'; 
import Header from '../components/Differ/single/Header';
const Categories= ({
  onEnquireClick = () => console.log('Enquire clicked'),
  onBookUsClick = () => console.log('Book Us clicked'),
  onMatchClick = (matchId) => console.log('Match clicked:', matchId),
  onViewAllClick = (categoryId) => console.log('View all clicked:', categoryId)
}) => {
  
  /*
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/films/portfolio');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const data = await response.json();
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);
  */

  const portfolioData = {
    categories: [
      {
        id: 'football',
        name: 'Football Matches',
        items: [
          { id: 1, title: 'Barcelona vs Real Madrid', venue: 'Camp Nou', status: 'Live', score: '2-1', time: "65'" },
          { id: 2, title: 'Man United vs Liverpool', venue: 'Old Trafford', status: 'Upcoming', score: null, time: null },
          { id: 3, title: 'PSG vs Marseille', venue: 'Parc des Princes', status: 'Completed', score: '4-0', time: 'FT' },
          { id: 4, title: 'Bayern Munich vs Dortmund', venue: 'Allianz Arena', status: 'Completed', score: '3-2', time: 'FT' },
          { id: 5, title: 'Chelsea vs Arsenal', venue: 'Stamford Bridge', status: 'Completed', score: '2-2', time: 'FT' },
        ]
      },
      {
        id: 'cricket',
        name: 'Cricket Matches',
        items: [
          { id: 6, title: 'India vs Australia', venue: 'MCG', status: 'Live', score: '245/6', overs: '45.3' },
          { id: 7, title: 'England vs South Africa', venue: "Lord's", status: 'Upcoming', score: null, overs: null },
          { id: 8, title: 'Pakistan vs New Zealand', venue: 'Karachi', status: 'Completed', score: 'NZ 320/7', overs: '50.0' },
          { id: 9, title: 'Bangladesh vs Sri Lanka', venue: 'Dhaka', status: 'Completed', score: 'SL 289/9', overs: '50.0' },
          { id: 10, title: 'West Indies vs Zimbabwe', venue: 'Harare', status: 'Completed', score: 'WI 315/8', overs: '50.0' },
        ]
      },
      {
        id: 'basketball',
        name: 'Basketball Games',
        items: [
          { id: 11, title: 'Lakers vs Warriors', venue: 'Staples Center', status: 'Live', score: '102-98', time: 'Q4 02:15' },
          { id: 12, title: 'Celtics vs Nets', venue: 'TD Garden', status: 'Upcoming', score: null, time: null },
          { id: 13, title: 'Bulls vs Heat', venue: 'United Center', status: 'Completed', score: '112-109', time: 'FT' },
          { id: 14, title: 'Mavericks vs Suns', venue: 'American Airlines Center', status: 'Completed', score: '120-118', time: 'FT' },
          { id: 15, title: 'Knicks vs Raptors', venue: 'Madison Square Garden', status: 'Completed', score: '105-101', time: 'FT' },
        ]
      }
    ]
  };

  if (!portfolioData) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-xl">No data available</div>
      </div>
    );
  }

  return (
    <>
      <Header  />
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-1">
        {portfolioData.categories.map((category) => (
          <SmallCategory
            key={category.id}
            category={category}
            onFilmClick={onMatchClick}
            onViewAllClick={onViewAllClick}
          />
        ))}
      </main>
    </div>
    </>
  );
};

export default Categories;