import React from 'react';
import TypeNav from './shared/TypeNav';
import {
    Crosshair, Gamepad2, Swords, Shield, Flame,
    Zap, Target, Globe
} from 'lucide-react';

const gameItems = [
    { name: 'Valorant', icon: Crosshair },
    { name: 'CS2', icon: Target },
    { name: 'League of Legends', icon: Shield },
    { name: 'Dota 2', icon: Swords },
    { name: 'Fortnite', icon: Flame },
    { name: 'Apex Legends', icon: Zap },
    { name: 'Overwatch 2', icon: Gamepad2 },
    { name: 'Rocket League', icon: Globe },
];

const GamesType = () => <TypeNav items={gameItems} basePath="/games" />;

export default GamesType;
