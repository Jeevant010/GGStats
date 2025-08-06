import React from 'react'
import { House, Search, User, LayoutPanelLeft} from "lucide-react";
import { useState } from 'react';
export default function Slidebar(){

    const [isActive, setIsActive] = useState(0);

    const menuItems = [
        {Icon : House, label: "Home"},
        {Icon : Search, label: "Search"},
        { Icon: LayoutPanelLeft, label: "Categories" },
        {Icon : User, label: "Profile"},
    ];



  return (
    <div>
        <div className="main-slide h-screen w-24  top-0 left-0 hover:w-[180px] transition-all duration-300 ease-in-out bg-black-900 text-black bg-black-900 shadow-lg z-50">


            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/100 via-black/80 to-transparent pointer-events-none z-10"></div> */}

            <div className='menu-items relative flex flex-col gap-8'>
                <div className='logo py-4 mb-28 w-24 z-50 px-4 relative'>
                    <img src="https://t3.ftcdn.net/jpg/12/82/15/68/240_F_1282156894_dJTHOpUEf1Oi8PmH9l7PRNNob17ykOSY.jpg" alt="logo" />
                    
                </div>
                {menuItems.map(({Icon, label}, index) => (
                    <div 
                    className={`group flex-center gap-4 px-8 hover:cursor-pointer z-50 ${isActive === index ? "text-black": "text-gray-500"}`}
                    
                    key={index}
                    onClick={() => setIsActive(index)}
                    >
                        <span><Icon/></span>
                        <span className='hidden group-hover:inline'>{label}</span>
                    </div>
                ))}
           
            </div>

        </div>
    </div>
  )
}
