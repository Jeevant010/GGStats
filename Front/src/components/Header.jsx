import React, { useState } from 'react'
import Logo from './logo';
import Slidebar from './slidebar';
import {Menu, X} from "lucide-react";
const Header = () => {
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleSlidebar = () => {
    setIsSlidebarOpen(!isSlidebarOpen);

  };

  return (
    <div className="main-header  h-[80px] bg-black">
        
        {isSlidebarOpen ? (
            <button className='absolute z-100 text-white py-2 px-2 left-25 top-4 cursor-pointer ' onClick={toggleSlidebar}><X /></button>
        ):(
          <button className='absolute z-100 text-white py-2 px-2 left-25 top-4 cursor-pointer' onClick={toggleSlidebar}><Menu /></button>
        )}

        <Logo />
        <Slidebar isOpen={isSlidebarOpen} />

        <div className="header-items text-white justify-center items-center flex">
          <p>Header Items</p>
        </div>


    </div>
  )
}

export default Header