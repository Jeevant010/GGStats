import React from 'react';
import Header from '../components/Differ/single/Header';
import SportsType from '../components/SportsType';
import HeroCarousel from '../components/shared/HeroCarousel';
import Footer from '../components/shared/Footer';
import useBannerImages from '../hooks/useBannerImages';

const SportsHome = () => {
    const { images: sportsImages, loading } = useBannerImages("sports");

    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            <Header />
            <SportsType />
            <main className="flex-1">
                <HeroCarousel images={sportsImages} loading={loading} />
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
