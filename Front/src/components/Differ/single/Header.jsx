import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import Logo from '../../shared/logo/logo';
import Slidebar from '../../shared/Screen/slidebar';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Sports/Games', href: '#' },
  { label: 'Categories', href: '/categories' },
  { label: 'Live', href: '#' },
  { label: 'Register', href: '#' },
];

// Reusable Search Form
const SearchForm = ({ placeholder, buttonText }) => (
  <form className="flex w-full max-w-md" onSubmit={e => e.preventDefault()}>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full bg-gray-800/70 text-white placeholder-gray-400 rounded-l-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-red-600"
    />
    <button
      type="submit"
      className="bg-red-600 text-white rounded-r-full px-4 hover:bg-red-700 transition-colors"
    >
      {buttonText}
    </button>
  </form>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSlidebarOpen, setIsSlidebarOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(o => !o);
  const toggleSlidebar = () => setIsSlidebarOpen(o => !o);

  return (
    <div className="main-header h-[60px] bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 shadow-lg z-[100] flex items-center sticky px-4 ">
      <nav className="flex items-center w-full gap-4 relative" aria-label="Main navigation">
        <Logo />

        {/* Desktop Search */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto">
            <SearchForm placeholder="Search..." buttonText="Search" />
          </div>
        </div>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex items-center gap-2 ml-auto">
          {navItems.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className="inline-block px-5 py-2 rounded-full bg-white/80 text-black font-medium shadow hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white transition-all duration-200 hover:scale-105"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={toggleSlidebar}
              aria-label={isSlidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              className="text-white w-9 h-9 flex items-center justify-center rounded-full bg-black/60 shadow hover:bg-red-600 transition-colors"
            >
              {isSlidebarOpen ? <X /> : <Menu />}
            </button>
          </li>
        </ul>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <button
            onClick={toggleSlidebar}
            aria-label={isSlidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            className="text-white w-9 h-9 flex items-center justify-center rounded-full bg-black/60 shadow hover:bg-black/80 transition-colors"
          >
            {isSlidebarOpen ? <X /> : <Menu />}
          </button>
          <button
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="text-white w-9 h-9 flex items-center justify-center rounded-full bg-black/60 shadow hover:bg-black/80 transition-colors"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-[68px] left-0 right-0 mx-1 bg-black/95 rounded-2xl overflow-hidden z-[90] transition-all duration-300 origin-top ${
          mobileOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <div className="p-4 border-b border-gray-800">
          <SearchForm placeholder="Search..." buttonText="Go" />
        </div>
        <ul className="flex flex-col text-white gap-2 p-4">
          {navItems.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                className="block w-full text-center text-lg py-3 mb-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Slidebar */}
      <Slidebar isOpen={isSlidebarOpen} />
    </div>
  );
};

export default Header;
