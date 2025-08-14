import React, { useState } from 'react'
import { House, Search, User, LayoutPanelLeft, Award, Medal, Settings } from "lucide-react"

export default function Slidebar({ isOpen }) {
  const [isActive, setIsActive] = useState(0)

  const menuItems = [
    { Icon: House, label: "Home" },
    { Icon: Search, label: "Search" },
    { Icon: LayoutPanelLeft, label: "Categories" },
    { Icon: Award, label: "Awards" },
    { Icon: Medal, label: "Medals" },
    { Icon: User, label: "Profile" },
    { Icon: Settings, label: "Settings" },
  ]

  return (
    <aside
      className={`fixed top-[60px] right-0 h-[calc(100vh-60px)] z-50 transition-all duration-500 ease-in-out overflow-hidden
        ${isOpen ? 'w-60 opacity-100' : 'w-0 opacity-0 pointer-events-none'}
      `}
      style={{
        background: 'rgba(24, 24, 32, 0.75)',
        backdropFilter: isOpen ? 'blur(16px)' : 'none',
        borderTopLeftRadius: '1.5rem',
        borderBottomLeftRadius: '1.5rem',
        boxShadow: isOpen ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' : 'none',
      }}
    >
      <nav className={`flex flex-col gap-2 px-4 py-8 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="mb-4 border-b border-white/20 pb-2 text-lg font-bold tracking-wide text-white/80 pl-1 select-none">
          Menu
        </div>
        {menuItems.map(({ Icon, label }, index) => (
          <button
            key={label}
            onClick={() => setIsActive(index)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200
              ${isActive === index
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg scale-105'
                : 'text-gray-300 hover:bg-white/10 hover:text-pink-400'}
            `}
            style={{
              outline: isActive === index ? 'border-none' : 'none',
              outlineOffset: '2px',
            }}
          >
            <Icon size={22} />
            {isOpen && <span className="whitespace-nowrap">{label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  )
}
