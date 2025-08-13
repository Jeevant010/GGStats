import Logo from '../components/shared/logo/logo';
import Slidebar from '../components/shared/Screen/slidebar';
import { Menu, X } from "lucide-react";
import React, { useState } from 'react';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Sports/Games', href: '#' },
  { label: 'Categories', href: '#' },
  { label: 'Live', href: '#' },
  { label: 'Register', href: '#' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(o => !o);
  const toggleSlidebar = () => setIsSlidebarOpen(o => !o);

  return (
    <div className="main-header h-[60px] bg-black/20 backdrop-blur top-1 mx-1 z-[100] flex items-center rounded-full sticky px-4">
      <nav className="flex items-center w-full gap-4 relative" aria-label="Main navigation">
        <Logo />

      
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full justify-center pointer-events-none px-4">
          <form className="w-full max-w-md flex pointer-events-auto" onSubmit={(e)=>e.preventDefault()}>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800/70 text-white placeholder-gray-400 rounded-l-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-red-600 "
            />
            <button
              type="submit"
              className="bg-red-600 text-white rounded-r-full px-4 hover:bg-red-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex items-center gap-2 ml-auto">
          {navItems.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-white text-sm px-4 py-1 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-105 inline-block"
              >
                {item.label}
              </a>
            </li>
          ))}
          {/* Slidebar toggle */}
          <li>
            <button
              onClick={toggleSlidebar}
              aria-label={isSlidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              className="text-white w-9 h-9 flex items-center justify-center bg-yellow-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              {isSlidebarOpen ? <X />   : <Menu />}
            </button>
          </li>
        </ul>

        {/* Mobile Right Controls */}
        <div className="flex md:hidden items-center gap-2 ml-auto ">
         
          <button
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="text-white w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown (full-width below header) */}
      <div
        className={`md:hidden absolute top-[68px] left-0 right-0 mx-1 bg-black/95 rounded-2xl overflow-hidden z-[90] transition-all duration-300 origin-top ${mobileOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}
      >
        <div className="p-4 border-b border-gray-800">
          <form className="flex" onSubmit={(e)=>e.preventDefault()}>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800/70 text-white placeholder-gray-400 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="bg-red-600 text-white rounded-r-full px-4 hover:bg-red-700 transition-colors"
            >
              Go
            </button>
          </form>
        </div>
        <ul className="flex flex-col text-white gap-1 p-4">
          {navItems.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className="block w-full px-4 py-3 rounded-lg hover:bg-red-600 transition-colors"
                onClick={()=>setMobileOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Slidebar component (right side) */}
      <Slidebar isOpen={isSlidebarOpen} />
    </div>
  );
};

export default Header;
