// import React from "react";
// import SlideTextButton from "../multiple/SlideTextButton";
// import CardCategory from "../multiple/CardCategory";

// const SmallCategory = ({ category, onGameClick, onViewAllClick }) => (
//   <section className="py-8">
//     <div className="max-w-[1400px] mx-auto px-4">
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="text-lg md:text-xl font-semibold text-white tracking-wide">
//           {category.name}
//         </h2>
//         <SlideTextButton onClick={() => onViewAllClick(category.id)}>
//           View All
//         </SlideTextButton>
//       </div>

//       <div className="relative">
//         <div
//           className="flex overflow-x-auto snap-x snap-mandatory -mx-2 py-2 gap-3"
//           style={{
//             WebkitOverflowScrolling: 'touch',
//             scrollBehavior: 'smooth',
//           }}
//         >
//           {Array.isArray(category.items) && category.items.map((game) => (
//             <div key={game.id} className="snap-start shrink-0">
//               <CardCategory game={game} onGameClick={onGameClick} />
//             </div>
//           ))}
//         </div>

//         <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-surface-900 to-transparent" />
//       </div>
//     </div>
//   </section>
// );

// export default SmallCategory;