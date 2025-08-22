import React from "react";
// import Slidebar from "../components/slidebar";
// import Logo from "../components/logo";
import Hero from '../components/HomePageComponent/Hero';
import SportsType from '../components/SportsType';
import Header from "../components/Differ/single/Header";
import News from "../components/HomePageComponent/News";

const Home = () => {
    return (
        
        <>
            <div className="relative min-h-screen bg-[url('/src/assets/gradiant2.svg')] bg-no-repeat bg-cover bg-left-center bg-green-400 overflow-hidden">
  
  <Header />
  <SportsType />
   <Hero /> 
   <News />

  
</div>

        </>

    )};

export default Home;