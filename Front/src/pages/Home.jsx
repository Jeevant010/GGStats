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
            {/* <div className="relative min-h-screen bg-[url('/src/assets/GradeGrey.jpg')] bg-no-repeat bg-cover bg-left-center  overflow-hidden"> */}
  
  <Header />
  <SportsType />

   <Hero /> 
   <News />
   <UpcomingEvents />

  
{/* </div> */}

        </>

    )};

export default Home;