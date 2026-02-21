import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TypeNav = ({ items = [], basePath = '/sports' }) => {
    const location = useLocation();

    const getPath = (name) => {
        return `${basePath}/${name.toLowerCase().replace(/\s+/g, '-')}`;
    };

    return (
        <div className="border-b border-white/5 bg-surface-800/50">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto scrollbar-thin">
                    {items.map((item) => {
                        const path = getPath(item.name);
                        const isActive = location.pathname === path;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                to={path}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${isActive
                                    ? 'bg-accent/15 text-accent border border-accent/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <Icon size={14} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TypeNav;
