import React from "react";
import SlideTextButton from "../multiple/SlideTextButton";
import CardCategory from "../multiple/CardCategory";

const SmallCategory = ({ category, onGameClick, onViewAllClick }) => (
  <section className="py-14 bg-white rounded-3xl mx-4 sm:mx-8 my-8 shadow-md">
    <div className="max-w-7xl mx-auto px-4">
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extralight text-black uppercase tracking-widest">
          {category.name}
        </h2>
        <SlideTextButton onClick={() => onViewAllClick(category.id)}>
          View All
        </SlideTextButton>
      </div>
      
      <div className="relative">
        <div
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-2 py-2"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
          }}
        >
          {Array.isArray(category.items) && category.items.map((game) => (
            <div key={game.id} className="snap-start">
              <CardCategory game={game} onGameClick={onGameClick} />
            </div>
          ))}
        </div>
        
        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  </section>
);


export default SmallCategory;