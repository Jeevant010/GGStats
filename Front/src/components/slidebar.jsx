import React from 'react'
import { House, Search, User, LayoutPanelLeft, Award, Medal,Settings, Menu} from "lucide-react";
import { useState } from 'react';
// import Logo from './logo';

export default function Slidebar({ isOpen }){

    const [isActive, setIsActive] = useState(0);
    const menuItems = [
        {Icon : House, label: "Home"},
        {Icon : Search, label: "Search"},
        { Icon: LayoutPanelLeft, label: "Categories" },
        {Icon : Award, label: "Awards"},
        {Icon : Medal, label: "Medals"},
        {Icon : User, label: "Profile"},
        {Icon : Settings, label: "Settings"},
    ];

  return (
    <div>
        <div className={`group main-slide absolute h-screen w-24 top-[80px] left-0 hover:w-[200px] transition-all duration-300 ease-in-out bg-black text-white shadow-lg z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

            {/* <Logo /> */}
           
                
            <div className='menu-items relative flex flex-col gap-8 px-[6px] top-10 '>
                {menuItems.map(({Icon, label}, index) => (
                    <div 
                    className={`flex items-center gap-4 px-8 hover:cursor-pointer z-50 ${isActive === index ? "text-black bg-white py-4 ml-0 mr-0 rounded-sm transition-all duration-600 ease-in-out ": "text-gray-500"}`}
                    
                    key={index}
                    onClick={() => setIsActive(index)}
                    >

                        <div className="single_icon hover:text-red-700 flex items-center gap-4">
                        <span><Icon/></span>
                        <span className='hidden group-hover:inline'>{label}</span>
                        </div>
                     </div>
                ))}
           
            </div>

        </div>
    </div>
  )
}
