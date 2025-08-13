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
      <li key={s} className="hover:text-red-600">
        {s === 'Cricket' ? (
          <Link to="/sports/cricket" onClick={isMobile ? () => setShowMenu(false) : undefined}>
            {s}
          </Link>
        ) : (
          <a href="#" onClick={isMobile ? () => setShowMenu(false) : undefined}>
            {s}
          </a>
        )}
      </li>
    ))

  return (
    <header className="h-[60px] bg-gradient-to-t from-purple-400 to-indigo-800 flex items-center px-4">
      <nav className="flex w-full items-center justify-between">
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white">
          {renderLinks()}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="absolute top-[120px] left-0 w-full bg-black md:hidden rounded-b-3xl">
          <ul className="flex flex-col text-white gap-4 py-4 px-8">
            {renderLinks(true)}
          </ul>
        </div>
      )}
    </header>
  )
}

export default SportsType
