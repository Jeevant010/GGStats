import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
const sports = [
  'Cricket',
  'Football',
  'Basketball',
  'Badminton',
  'Kabaddi',
  'Volleyball',
  'Hockey',
  'Tennis',
  'Table Tennis',
  'Golf',
  'Chess',
]

const SportsType = () => {
  const [showMenu, setShowMenu] = useState(false)

  const handleToggleButton = () => {
    setShowMenu((prev) => !prev)
  }

  return (
    <div className="main-header h-[60px] bg-gradient-to-t from-purple-400 to-indigo-800 left-1 right-1 z-10 flex items-center ">
      <nav aria-label="Sports" className="flex w-full items-center">
        {/* Desktop menu */}
        <ul className="hidden md:flex ml-auto items-center gap-8 text-white px-6 py-2">
          {sports.map((s) => (
            <li key={s} className="hover:text-red-600">
              {s === 'Cricket' ? (
                <Link to="/sports/cricket">Cricket</Link>
              ) : (
                <a href="#">{s}</a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <div className="md:hidden ml-auto pr-4">
          <button
            type="button"
            onClick={handleToggleButton}
            aria-expanded={showMenu}
            aria-controls="mobile-menu"
            aria-label={showMenu ? 'Close menu' : 'Open menu'}
          >
            {showMenu ? (
              <X aria-hidden="true" className="text-white w-6 h-6" />
            ) : (
              <Menu aria-hidden="true" className="text-white w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`absolute top-[60px] left-0 w-full bg-black md:hidden z-[200] transition-all duration-500 ease-in-out ${showMenu ? 'opacity-100 translate-y-0 pointer-events-auto rounded-3xl' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        style={{ willChange: 'opacity, transform' }}
      >
        <ul className="flex flex-col text-white gap-4 py-4 px-8">
          {sports.map((s) => (
            <li key={s} className="hover:text-red-600">
              {s === 'Cricket' ? (
                <Link to="/sports/cricket" onClick={() => setShowMenu(false)}>
                  Cricket
                </Link>
              ) : (
                <a href="#" onClick={() => setShowMenu(false)}>{s}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SportsType

