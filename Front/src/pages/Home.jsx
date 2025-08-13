import React from "react";
// import Slidebar from "../components/slidebar";
// import Logo from "../components/logo";
import Cricket from '../components/sports/cricket';
import SportsType from '../components/SportsType';
import Header from "../components/Differ/single/Header";

const Home = () => {
    return (
        
        <>
            <div className="relative min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-black overflow-hidden">
  
  <Header />
  <SportsType />
  <Cricket />
</div>

        </>

    )};

export default Home;