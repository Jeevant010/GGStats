import Logo from '../components/shared/logo/logo';
import Slidebar from '../components/shared/Screen/slidebar';
import { Menu, X , Gamepad2, Home} from "lucide-react";
import React, { useState } from 'react';


const Header = () => {  
 
  const [showMenu, setShowMenu] = useState(false);
  const handleToggleButton =() => {
    setShowMenu(!showMenu);
  };

  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleSlidebar = () => {
    setIsSlidebarOpen(!isSlidebarOpen);

  };

  return (
  <div className="main-header h-[60px] bg-black top-1 mx-1 z-[100] flex items-center rounded-full sticky">  
        
        <Logo />
        {/* Desktop  Menu*/}



               
        

        

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






              <nav className='hidden md:block flex-1'>

              <ul className='flex text-white gap-4  justify-end py-7 px-6'>
                
                <li className='hover:bg-red-600 px-4 py-1 rounded-lg transition-all duration-300 transform hover:scale-110'>
                  <a href='#'>Home</a>
                </li>
                <li className='hover:bg-red-600 px-4 py-1 rounded-lg transition-all duration-300 transform hover:scale-110'>
                  <a href='#'>Sports/Games</a>
                </li>
                <li className='hover:bg-red-600 px-4 py-1 rounded-lg transition-all duration-300 transform hover:scale-110'>
                  <a href='#'>Categories</a>
                </li>
                <li className='hover:bg-red-600 px-4 py-1 rounded-lg transition-all duration-300 transform hover:scale-110'>
                  <a href='#'>Live</a>
                </li>
                <li className='hover:bg-red-600 px-4 py-1 rounded-lg transition-all duration-300 transform hover:scale-120'>
                  <a href='#'>Register</a>
                </li>
              </ul>
            </nav>
         

            {/* Button in mobile*/}
            <div className='md:hidden ml-auto pr-4 '>
              {showMenu ? (
                <button onClick={handleToggleButton} aria-label="Close menu">
                  <X className="text-white w-8 h-8 " />
                </button>
              ) : (
                <button onClick={handleToggleButton} aria-label="Open menu">
                  <Menu className="text-white w-8 h-8 " />
                </button>
              )}
            </div>

            {/* Mobile Menu */}
            <nav
              className={`absolute top-[80px] left-0 w-full bg-black md:hidden z-[200] transition-all duration-500 ease-in-out
                ${showMenu ? 'opacity-100 translate-y-0 pointer-events-auto rounded-3xl' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
              style={{ willChange: 'opacity, transform' }}
            >
              <ul className='flex flex-col text-white gap-4 py-4 px-8'>
                <li> <a href='#'>Home</a></li>
                <li> <a href='#'>Sports/Games</a></li>
                <li> <a href='#'>Categories</a></li>
                <li> <a href='#'>Register</a></li>
              </ul>
            </nav>

          </div>
    
  )
}

export default Header;
