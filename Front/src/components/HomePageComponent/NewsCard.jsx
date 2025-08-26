import React, { useState,useEffect } from 'react';
import gsap from 'gsap';

const GSAPText = () => {
  useEffect(() => {
    gsap.fromTo('.news-cards',{
      opacity: 0,
      y:20,
    },
    {
      opacity:1,
      y:0,
      delay:1.5,
      stagger:0.2,
    })
  }, [])
  return null;
}

const NewsCard = ({ data }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 8; 
  const maxPage = Math.max(0, Math.ceil(data.length / itemsPerPage) - 1); // Maximum number of pages 

  const handleNext = () => {
    if (page < maxPage) setPage(page + 1);
  };
  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const visibleData = data.slice(page * itemsPerPage, (page + 1) * itemsPerPage); // Get current page data

  return (
    <div className="relative">
      <GSAPText />
      <div className="news-cards grid grid-cols-1 sm:grid-cols-4 gap-6">
        {visibleData.map((curItem, index) => (
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200 border border-gray-200"
            key={index}
          >
            {curItem.urlToImage && (
              <img
                src={curItem.urlToImage}
                alt={curItem.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">{curItem.title}</h2>
              <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{curItem.description}</p>
              {curItem.url && (
                <a
                  href={curItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block text-blue-600 hover:underline text-sm font-medium"
                  onClick={e => { e.stopPropagation(); }} 
                >
                  Read more
                </a>
              )}
            </div>
          </div>
        ))}
      </div>


      {page > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full shadow p-2 hover:bg-blue-200 z-10"
          aria-label="Previous"
        >
          <span className="text-2xl">&#8592;</span>
        </button>
      )}
      {page < maxPage && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full shadow p-2 hover:bg-blue-200 z-10"
          aria-label="Next"
        >
          <span className="text-2xl">&#8594;</span>
        </button>
      )}
    </div>
  );
}

export default NewsCard;
