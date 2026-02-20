
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

import Home from './pages/Home';
import SportsHome from './pages/SportsHome';
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
import FormulaOne from './components/sports/F1.jsx';
import Valorant from './components/Games/Valorant.jsx';

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
        <Route path="/sports/tennis" element={<Tennis />} />
        <Route path="/sports/table-tennis" element={<TableTennis />} />
        <Route path="/sports/golf" element={<Golf />} />
        <Route path="/sports/chess" element={<Chess />} />
        <Route path="/sports/formula-1" element={<FormulaOne />} />

        {/* Game detail routes */}
        <Route path="/games/valorant" element={<Valorant />} />

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
