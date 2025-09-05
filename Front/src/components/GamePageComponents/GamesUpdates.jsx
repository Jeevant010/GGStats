import React from 'react'
import { useState, useEffect } from 'react';

const GamesUpdates = () => {
    const [newsData, setNewsData] = useState([]);
    // const API_KEY = "a90297fb0e554032ac48ff512ced53e7";

    const API_KEY = "fad5ba3a33835fc789c5773b930c4bea";

    const getData = async () => {
      // const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);

      const response = await fetch(`https://gnews.io/api/v4/search?q=Google&lang=en&max=5&apikey=${API_KEY}`);
      console.log(response);
      const jsondata = await response.json();
      setNewsData(jsondata.articles);
    };
    useEffect(() => {
      getData("games");
    }, []);
    // const handleInput = (e) => {
    //   setSearch(e.target.value);
    // }


  return (
    <div className='bg-red-300'>
      <h1 className='text-2xl font-bold p-4 '>Games Updates</h1>
      <p className='p-4'>Stay tuned for the latest updates on your favorite games! From new releases to exciting features, we've got you covered. Check back often for the freshest news and updates in the gaming world.</p>




      <div className="cards  bg-yellow-400 grid md:grid-cols-3 sm:grid-cols-1 p-4 gap-4">

     

        {newsData.slice(0,9).map((article, idx) => (
          <div key= {idx} className=' bg-green-400 p-4 flex flex-col'>
              <img src={article.image} alt={article.title} className='w-full object-cover mb-2' />

            <span className="font-bold">{article.title}</span>
      <span className="text-xs">{article.source.name}</span>
      <span className="text-sm line-clamp-2">{article.description}</span>
      </div>
        ))}


      </div>


      </div>
  )
}

export default GamesUpdates