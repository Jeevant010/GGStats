import React from 'react';
import Header from '../components/Differ/single/Header';
import SportsType from '../components/SportsType';
import HeroCarousel from '../components/shared/HeroCarousel';
import Footer from '../components/shared/Footer';

const sportsImages = [
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
];

const SportsHome = () => {
    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            <Header />
            <SportsType />
            <main className="flex-1">
                <HeroCarousel images={sportsImages} />
                <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-8">
                    <h2 className="text-xl font-bold text-white mb-4">Trending in Sports</h2>
                    <p className="text-gray-500 text-sm">Select a sport above to view live scores, standings, and match details.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default SportsHome;
