
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

import Home from './pages/Home';
import SportsHome from './pages/SportsHome';
import Profile from './pages/Profile';
import Cricket from './pages/sports/Cricket.jsx';
import Football from './pages/sports/Football.jsx';
import Basketball from './pages/sports/BasketBall.jsx';
import Chess from './pages/sports/Chess.jsx';
import Golf from './pages/sports/Golf.jsx';
import TableTennis from './pages/sports/TableTennis.jsx';
import Tennis from './pages/sports/Tennis.jsx';
import Badminton from './pages/sports/Badminton.jsx';
import Kabaddi from './pages/sports/Kabaddi.jsx';
import Hockey from './pages/sports/Hockey.jsx';
import VolleyBalls from './pages/sports/Volleyballs.jsx';
import GamesHome from './pages/GamesHome.jsx';
import Live from './pages/Live.jsx';
import SignUp from './pages/SignUp.jsx';
import FormulaOne from './pages/sports/F1.jsx';
import Valorant from './pages/games/Valorant.jsx';
import Cs2 from './pages/games/Cs2.jsx';
import Baseball from './pages/sports/Baseball.jsx';
function App() {
  const [cookie] = useCookies(["token"]);
  const isLoggedIn = !!cookie.token;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports" element={<SportsHome />} />
        <Route path="/games" element={<GamesHome />} />
        <Route path="/live" element={<Live />} />

        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {!isLoggedIn && <Route path="/register" element={<SignUp />} />}

        {/* Sport detail routes */}
        <Route path="/sports/cricket" element={<Cricket />} />
        <Route path="/sports/football" element={<Football />} />
        <Route path="/sports/basketball" element={<Basketball />} />
        <Route path="/sports/badminton" element={<Badminton />} />
        <Route path="/sports/kabaddi" element={<Kabaddi />} />
        <Route path="/sports/volleyball" element={<VolleyBalls />} />
        <Route path="/sports/hockey" element={<Hockey />} />
        <Route path="/sports/baseball" element={<Baseball />} />
        <Route path="/sports/tennis" element={<Tennis />} />
        <Route path="/sports/table-tennis" element={<TableTennis />} />
        <Route path="/sports/golf" element={<Golf />} />
        <Route path="/sports/chess" element={<Chess />} />
        <Route path="/sports/formula-1" element={<FormulaOne />} />

        {/* Game detail routes */}
        <Route path="/games/valorant" element={<Valorant />} />
        <Route path="/games/cs2" element={<Cs2 />} />

        <Route path="*" element={<Home />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: '#1a1d25',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      />
    </Router>
  );
}

export default App;
