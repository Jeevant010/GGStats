import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const sports = [
  'Cricket', 'Football', 'Basketball', 'Badminton', 'Kabaddi', 'Volleyball',
  'Hockey', 'Tennis', 'Table Tennis', 'Golf', 'Chess'
]

const SportsType = () => {
  const [showMenu, setShowMenu] = useState(false)

  const renderLinks = (isMobile = false) =>
    sports.map((s) => (
      <li key={s} className="">
        {s === 'Cricket' ? (
          <Link
            to="/sports/cricket"
            onClick={isMobile ? () => setShowMenu(false) : undefined}
            className={`
              ${isMobile
                ? 'block w-full text-center text-lg py-3 mb-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200'
                : 'inline-block px-5 py-2 rounded-full bg-white/80 text-black font-medium shadow hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white transition-all duration-200 hover:scale-105'}
            `}
          >
            {s}
          </Link>
        ) : (
          <a
            href="#"
            onClick={isMobile ? () => setShowMenu(false) : undefined}
            className={`
              ${isMobile
                ? 'block w-full text-center text-lg py-3 mb-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-200'
                : 'inline-block px-5 py-2 rounded-full bg-white/80 text-black font-medium shadow hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 hover:text-white transition-all duration-200 hover:scale-105'}
            `}
          >
            {s}
          </a>
        )}
      </li>
    ))

  return (
    <header className="h-[60px] bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 shadow-lg flex items-center px-4 relative z-20 rounded-b-3xl">
      <nav className="flex w-full items-center justify-between">
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4 lg:gap-8 text-black">
          {renderLinks()}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white bg-black/60 rounded-full p-2 shadow hover:bg-black/80 transition-colors"
          onClick={() => setShowMenu(!showMenu)}
          aria-label={showMenu ? 'Close sports menu' : 'Open sports menu'}
        >
          {showMenu ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 w-full bg-black/95 rounded-b-3xl shadow-2xl overflow-hidden transition-all duration-300 z-10 ${
          showMenu ? 'top-[60px] opacity-100 scale-y-100' : 'top-[60px] opacity-0 scale-y-0 pointer-events-none'
        } origin-top`}
        style={{ backdropFilter: 'blur(6px)' }}
      >
        <ul className="flex flex-col gap-2 py-4 px-6">
          {renderLinks(true)}
        </ul>
      </div>
    </header>
  )
}

export default SportsType
