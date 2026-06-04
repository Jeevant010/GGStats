import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group z-50">
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-accent/30 transition-shadow duration-300">
        <Gamepad2 size={20} className="text-white" />
      </div>
      <span className="text-white text-xl font-bold tracking-tight">
        GG<span className="text-accent">Stats</span>
      </span>
    </Link>
  );
};

export default Logo;