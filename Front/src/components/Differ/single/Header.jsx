import React, { useState } from 'react'
import Logo from '../../shared/logo/logo';
import Slidebar from '../../shared/Screen/slidebar';
import {Menu, X} from "lucide-react";
const Header = () => {
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleSlidebar = () => {
    setIsSlidebarOpen(!isSlidebarOpen);

  };

  return (
    <div className="main-header  h-[80px] bg-black flex w-full">
        
        

        <Logo />
        

        <div className="header-items text-white justify-center items-center flex w-full">
          <p>Header Items</p>
        </div>
        <div className='justify-end '>
          {isSlidebarOpen ? (
            <button className='z-100 text-white py-2 mt-5 px-2 justify-end left-25 r-0 top-4 cursor-pointer ' onClick={toggleSlidebar}><Menu /></button>
        ):(
          <button className='z-100 text-white py-2 mt-5 justify-end px-7 left-25 top-4 cursor-pointer' onClick={toggleSlidebar}><X /></button>
        )}
        </div>
          <div className='flex justify-end'><Slidebar isOpen={isSlidebarOpen} /></div>

    </div>
  )
}

export default Header;