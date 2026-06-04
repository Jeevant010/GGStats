import React from "react";
import HeroCarousel from '../components/common/HeroCarousel';
import Header from "../components/common/Header";
import News from "../components/home/News";
import { UpcomingEvents } from "../components/home/UpcomingEvents";
import Footer from "../components/common/Footer";
import useBannerImages from "../hooks/useBannerImages";

const Home = () => {
    const { images: heroImages, loading } = useBannerImages("home");

    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            <Header />
            <main className="flex-1">
                <HeroCarousel images={heroImages} loading={loading} />
                <News />
                <UpcomingEvents />
            </main>
            <Footer />
        </div>
    );
};

export default Home;