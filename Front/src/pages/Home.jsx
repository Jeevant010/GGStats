import React from "react";
// import Slidebar from "../components/slidebar";
// import Logo from "../components/logo";
import Hero from '../components/HomePageComponent/Hero';
import SportsType from '../components/SportsType';
import Header from "../components/Differ/single/Header";
import News from "../components/HomePageComponent/News";
import { UpcomingEvents } from "../components/HomePageComponent/UpcomingEvents";
const Home = () => {
    return (
        
        <>

    {/* Blurred background circle */}
    <div className="circlePosition w-full h-full bg-violet-400 rounded-[100%] absolute z-1 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[90px] pointer-events-none" />

    {/* Main content with backdrop blur */}
    <div className="relative z-10 backdrop-blur-xl">
        <Header />
        <SportsType />
        <Hero />
        <News />
        <UpcomingEvents />
    </div>


        </>

    )};

export default Home;