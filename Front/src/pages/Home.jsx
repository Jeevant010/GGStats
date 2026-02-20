import React from "react";
import HeroCarousel from '../components/shared/HeroCarousel';
import Header from "../components/Differ/single/Header";
import News from "../components/HomePageComponent/News";
import { UpcomingEvents } from "../components/HomePageComponent/UpcomingEvents";
import Footer from "../components/shared/Footer";

const heroImages = [
    "/game4.jpg",
    "/game2.jpg",
    "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
    "/game3.jpg",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
];

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col bg-surface-900">
            <Header />
            <main className="flex-1">
                <HeroCarousel images={heroImages} />
                <News />
                <UpcomingEvents />
            </main>
            <Footer />
        </div>
    );
};

export default Home;