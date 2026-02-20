import React from 'react';
import TypeNav from './shared/TypeNav';
import {
  CircleDot, Dribbble, Target, PersonStanding,
  Volleyball, Swords, Disc, Flag, Layers, Bike
} from 'lucide-react';

const sportsItems = [
  { name: 'Cricket', icon: CircleDot },
  { name: 'Football', icon: Dribbble },
  { name: 'Basketball', icon: Dribbble },
  { name: 'Badminton', icon: Target },
  { name: 'Kabaddi', icon: PersonStanding },
  { name: 'Volleyball', icon: Volleyball },
  { name: 'Hockey', icon: Swords },
  { name: 'Tennis', icon: Disc },
  { name: 'Table Tennis', icon: Disc },
  { name: 'Golf', icon: Flag },
  { name: 'Chess', icon: Layers },
  { name: 'Formula 1', icon: Bike },
];

const SportsType = () => <TypeNav items={sportsItems} basePath="/sports" />;

export default SportsType;
