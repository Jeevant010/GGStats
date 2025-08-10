import React from "react";

import Header from "../components/Header";
import SportsType from "../components/SportsType";


const Home = () => {
    return (
        
        <>
            <div className="bg-gradient-to-t from-purple-400 to-indigo-800 min-h-screen">
                <Header />
                {/* Offset main content by the fixed header height (80px) */}
                {/* <main className="pt-[70px]"> */}
                    <SportsType />
                {/* </main> */}
                </div>
        </>

    )};

export default Home;