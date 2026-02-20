import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const NewsCard = ({ data = [] }) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const maxPage = Math.max(0, Math.ceil(data.length / itemsPerPage) - 1);

  const handleNext = () => { if (page < maxPage) setPage(page + 1); };
  const handlePrev = () => { if (page > 0) setPage(page - 1); };

  const visibleData = data.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">No articles available.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleData.map((curItem, index) => (
          <article
            className="bg-surface-700 rounded-xl overflow-hidden flex flex-col hover:ring-1 hover:ring-accent/30 transition-all duration-300 group"
            key={index}
          >
            {curItem.urlToImage ? (
              <img
                src={curItem.urlToImage}
                alt={curItem.title}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-40 bg-surface-600 flex items-center justify-center">
                <span className="text-gray-600 text-xs">No Image</span>
              </div>
            )}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 leading-snug">{curItem.title}</h3>
              <p className="text-gray-500 text-xs mb-3 flex-1 line-clamp-2">{curItem.description}</p>
              {curItem.url && (
                <a
                  href={curItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-accent hover:text-accent-hover text-xs font-medium transition-colors mt-auto"
                  onClick={e => e.stopPropagation()}
                >
                  Read more <ExternalLink size={12} />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {maxPage > 0 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={handlePrev}
            disabled={page === 0}
            className="w-9 h-9 rounded-lg bg-surface-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm text-gray-500">
            {page + 1} / {maxPage + 1}
          </span>
          <button
            onClick={handleNext}
            disabled={page >= maxPage}
            className="w-9 h-9 rounded-lg bg-surface-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
