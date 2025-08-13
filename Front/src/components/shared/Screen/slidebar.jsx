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
      className={`fixed top-[60px] right-0 h-screen bg-black text-white shadow-lg z-50 
        transition-all duration-600 ease-in-out overflow-hidden
        ${isOpen ? 'w-52 opacity-100 backdrop-blur' : 'w-0 opacity-0'}`}
    >
      <nav className={`flex flex-col gap-4 px-3 py-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {menuItems.map(({ Icon, label }, index) => (
          <button
            key={label}
            onClick={() => setIsActive(index)}
            className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-all
              ${isActive === index ? "bg-white text-black" : "text-gray-400 hover:text-red-600"}`}
          >
            <Icon />
            {isOpen && <span>{label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  )
}
