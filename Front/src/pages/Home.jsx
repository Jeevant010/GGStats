import React from "react";
import HeroCarousel from '../components/shared/HeroCarousel';
import Header from "../components/Differ/single/Header";
import News from "../components/HomePageComponent/News";
import { UpcomingEvents } from "../components/HomePageComponent/UpcomingEvents";
import Footer from "../components/shared/Footer";
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