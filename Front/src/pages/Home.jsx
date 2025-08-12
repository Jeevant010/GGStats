import React from "react";
// import Slidebar from "../components/slidebar";
// import Logo from "../components/logo";
import Header from "../components/Differ/single/Header";

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