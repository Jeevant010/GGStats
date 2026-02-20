import React, { useState } from 'react';
import { Menu, X, Home, Tv, Radio, UserCircle, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Logo from '../../shared/logo/logo';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Sports', href: '/sports', icon: Tv },
  { label: 'Games', href: '/games', icon: Tv },
  { label: 'Live', href: '/live', icon: Radio },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [cookie] = useCookies(["token"]);
  const isLoggedIn = !!cookie.token;

  return (
    <header className="h-16 glass sticky top-0 z-[100] border-b border-white/5">
      <nav className="flex items-center justify-between w-full h-full max-w-[1400px] mx-auto px-4 lg:px-6">
        <Logo />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.href ||
              (item.href !== '/' && location.pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              to={isLoggedIn ? '/profile' : '/register'}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5"
            >
              {isLoggedIn ? <UserCircle size={16} /> : <LogIn size={16} />}
              {isLoggedIn ? 'Profile' : 'Sign In'}
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 glass border-b border-white/5 overflow-hidden z-[90] transition-all duration-300 origin-top ${mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
      >
        <ul className="flex flex-col gap-1 p-3">
          {navItems.map(item => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              to={isLoggedIn ? '/profile' : '/register'}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200"
              onClick={() => setMobileOpen(false)}
            >
              {isLoggedIn ? <UserCircle size={18} /> : <LogIn size={18} />}
              {isLoggedIn ? 'Profile' : 'Sign In'}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
