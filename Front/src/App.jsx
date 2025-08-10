// import { useState } from 'react';
import { Search } from 'lucide-react';
import './App.css';
import Home from './pages/Home';
import SearchRoute from './pages/Search';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cricket from './components/sports/Cricket.jsx';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchRoute />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
          <Route path="/sports/cricket" element={<Cricket />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
