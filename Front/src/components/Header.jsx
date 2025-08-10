import React, { useState } from 'react'
import Logo from './logo';
import { Menu, X , Gamepad2, Home} from "lucide-react";
const Header = () => {  
 
  const [showMenu, setShowMenu] = useState(false);
  const handleToggleButton =() => {
    setShowMenu(!showMenu);
  };

  return (
  <div className="main-header h-[60px] bg-black top-1 mx-1 z-[100] flex items-center rounded-full sticky">  
        
        <Logo />
        {/* Desktop  Menu*/}

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

export default Header