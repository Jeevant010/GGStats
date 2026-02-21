import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Github, Twitter, Youtube, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-surface-800/50 mt-auto">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent to-purple-500 flex items-center justify-center">
                                <Gamepad2 size={16} className="text-white" />
                            </div>
                            <span className="text-white text-lg font-bold">
                                GG<span className="text-accent">Stats</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Your one-stop destination for live sports scores, esports tournaments, and gaming news.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2">
                            {[
                                { label: 'Home', to: '/' },
                                { label: 'Sports', to: '/sports' },
                                { label: 'Games', to: '/games' },
                                { label: 'Live', to: '/live' },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link to={link.to} className="text-gray-500 hover:text-accent text-sm transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sports */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Sports</h4>
                        <ul className="space-y-2">
                            {['Cricket', 'Football', 'Basketball', 'Formula 1'].map((sport) => (
                                <li key={sport}>
                                    <Link
                                        to={`/sports/${sport.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-gray-500 hover:text-accent text-sm transition-colors"
                                    >
                                        {sport}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Connect</h4>
                        <div className="flex gap-3">
                            {[
                                { Icon: Github, href: 'https://github.com/Jeevant010/GGStats' },
                                { Icon: Twitter, href: 'https://twitter.com' },
                                { Icon: Youtube, href: 'https://youtube.com' },
                                { Icon: Mail, href: 'mailto:jeevant10@gmail.com' },
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs">© 2026 GGStats. All rights reserved.</p>
                    <p className="text-gray-600 text-xs">Built with ❤️ for sports enthusiasts</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
