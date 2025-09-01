
// ==================== REACT INBUILT HELPERS ===================

import { useState } from 'react';
import { Search, Volleyball } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';






// A normal css 
import './App.css';



// =========================== ROUTES AND COMPONENTS =====================
import Home from './pages/Home';
import SearchRoute from './pages/Search';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import Cricket from './components/sports/Cricket.jsx';
import Football from './components/sports/Football.jsx';
import Basketball from './components/sports/BasketBall.jsx';
import Chess from './components/sports/Chess.jsx';
import Golf from './components/sports/Golf.jsx';
import TableTennis from './components/sports/TableTennis.jsx';
import Tennis from './components/sports/Tennis.jsx';
import Badminton from './components/sports/Badminton.jsx';
import Kabaddi from './components/sports/Kabaddi.jsx';
import Hockey from './components/sports/Hockey.jsx';
import VolleyBalls from './components/sports/Volleyballs.jsx';
import GamesHome from './pages/GamesHome.jsx';
import Live from './pages/Live.jsx';
import SignUp from './components/Differ/single/SignUp.jsx';





// ========================= APP BEGINS HERE =================
function App() {
  
  const [cookie] = useCookies(["token"]);
  return (

    /**
     <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchRoute />} />
          <Route path = "/GamesHome" element={<GamesHome/>}/>
          <Route path="/categories" element={<Categories />} />
          <Route path="/live" element={<Live />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
          <Route path="/sports/cricket" element={<Cricket />} />
          <Route path="/sports/football" element={<Football />} />
          <Route path="/sports/basketball" element={<Basketball />} />
          <Route path="/sports/badminton" element={<Badminton />} />
          <Route path="/sports/kabaddi" element={<Kabaddi />} />
          <Route path="/sports/volleyball" element={<VolleyBalls />} />
          <Route path="/sports/hockey" element={<Hockey />} />
          <Route path="/sports/tennis" element={<Tennis />} />
          <Route path="/sports/table tennis" element={<TableTennis />} />
          <Route path="/sports/golf" element={<Golf />} />
          <Route path="/sports/chess" element={<Chess />} />
        </Routes>
      </Router>
    



     */
    <>
      <Router>
        {
          cookie.token? (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchRoute />} />
              <Route path = "/GamesHome" element={<GamesHome/>}/>
              <Route path="/categories" element={<Categories />} />
              <Route path="/live" element={<Live />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Home />} />
              <Route path="/sports/cricket" element={<Cricket />} />
              <Route path="/sports/football" element={<Football />} />
              <Route path="/sports/basketball" element={<Basketball />} />
              <Route path="/sports/badminton" element={<Badminton />} />
              <Route path="/sports/kabaddi" element={<Kabaddi />} />
              <Route path="/sports/volleyball" element={<VolleyBalls />} />
              <Route path="/sports/hockey" element={<Hockey />} />
              <Route path="/sports/tennis" element={<Tennis />} />
              <Route path="/sports/table tennis" element={<TableTennis />} />
              <Route path="/sports/golf" element={<Golf />} />
              <Route path="/sports/chess" element={<Chess />} />
            </Routes>

          ) : (

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchRoute />} />
              <Route path = "/GamesHome" element={<GamesHome/>}/>
              <Route path="/categories" element={<Categories />} />
              <Route path="/live" element={<Live />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="*" element={<Home />} />
              <Route path="/sports/cricket" element={<Cricket />} />
              <Route path="/sports/football" element={<Football />} />
              <Route path="/sports/basketball" element={<Basketball />} />
              <Route path="/sports/badminton" element={<Badminton />} />
              <Route path="/sports/kabaddi" element={<Kabaddi />} />
              <Route path="/sports/volleyball" element={<VolleyBalls />} />
              <Route path="/sports/hockey" element={<Hockey />} />
              <Route path="/sports/tennis" element={<Tennis />} />
              <Route path="/sports/table tennis" element={<TableTennis />} />
              <Route path="/sports/golf" element={<Golf />} />
              <Route path="/sports/chess" element={<Chess />} />
            </Routes>
          )
        }
        
      </Router>
    </>
  )
}

export default App;
