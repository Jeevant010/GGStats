# GGStats

A full-stack sports & esports statistics dashboard built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend). Track live scores, today's fixtures, and stats across football, basketball, hockey, baseball, Formula 1, and more — all in one dark-themed, responsive UI.

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 6 | Build tool & dev server |
| Tailwind CSS v4 | Styling |
| React Router DOM v7 | Client-side routing |
| Axios | API requests |
| Framer Motion | Animations |
| GSAP | Advanced animations |
| Lucide React | Icons |
| React Toastify | Notifications |
| React Cookie | Auth token management |

### Backend
| Tool | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose 8 | Database & ODM |
| Passport.js + JWT | Authentication |
| bcrypt | Password hashing |
| Helmet | Security headers |
| CORS | Cross-origin requests |
| dotenv | Environment config |

---

## 📁 Project Structure

```
GGStats/
├── Front/                          # React frontend (Vite)
│   └── src/
│       ├── App.jsx                 # Root router & paths
│       ├── main.jsx                # Entry point & provider wrappers
│       ├── index.css               # Design system & custom tokens
│       ├── components/
│       │   ├── common/             # Reusable UI (Header, Footer, DatePicker, etc.)
│       │   └── home/               # Sections local to Home view (News, NewsCard)
│       ├── contexts/               # React Contexts (AuthContext)
│       ├── services/               # Reusable API instances (api.js with Axios interceptors)
│       ├── hooks/                  # Custom React hooks (useLiveScores, useBannerImages)
│       └── pages/
│           ├── Home.jsx            # Home Page
│           ├── Live.jsx            # Live scores aggregator
│           ├── Profile.jsx         # Auth-gated User profile page
│           ├── SignUp.jsx          # Register/Sign Up Page
│           ├── sports/             # 13 Detailed sports pages (Football, Hockey, etc.)
│           └── games/              # 2 Detailed game pages (Cs2, Valorant)
│
└── back/                           # Express backend
    └── src/
        ├── server.js               # Entry point (Server listener + DB connection)
        ├── app.js                  # Express setup (Middlewares, Security, CORS)
        ├── config/                 # Configurations (Passport, CORS, DB connection)
        ├── models/                 # Mongoose schemas (User, Admin, Game)
        ├── middlewares/            # Custom express middlewares (Auth, Error handling)
        ├── controllers/            # Controller layer (Auth, Esports)
        ├── services/               # Service layer (Auth database queries, HLTV calls)
        ├── routes/                 # Express router setup
        └── utils/                  # Common utils (JWT signing helper)
```

---

## Setup and Installation

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (or local MongoDB)
- [api-sports.io](https://api-sports.io) API key

---

### 1. Clone the repo

```bash
git clone https://github.com/Jeevant010/GGStats.git
cd GGStats
```

---

### 2. Backend setup

```bash
cd back
npm install
```

Create `back/.env`:

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/GGStatsCollection?retryWrites=true&w=majority
TOKEN=YourJWTSecretKey
```

Start the backend:

```bash
npm start
# Server runs at http://localhost:9000
```

---

### 3. Frontend setup

```bash
cd Front
npm install
```

Create `Front/.env`:

```env
VITE_SPORTS_API_KEY=your_api_sports_key_here
```

> **Get your key:** Sign up at [dashboard.api-sports.io](https://dashboard.api-sports.io) — one key works for all sports (Football, Basketball, Hockey, Baseball, Formula 1).

Start the frontend:

```bash
npm run dev
# App runs at http://localhost:5173
```

---

## API Integrations

All live sports data is fetched directly from the [api-sports.io](https://api-sports.io) platform using today's date.

| Sport | API Endpoint | Status |
|---|---|---|
| ⚽ Football | `https://v3.football.api-sports.io/fixtures?date={date}` | ✅ Live |
| 🏀 Basketball | `https://v1.basketball.api-sports.io/games?date={date}` | ✅ Live |
| 🏒 Hockey | `https://v1.hockey.api-sports.io/games?date={date}` | ✅ Live |
| ⚾ Baseball | `https://v1.baseball.api-sports.io/games?date={date}` | ✅ Live |
| 🏎️ Formula 1 | api-sports Formula 1 | ✅ Live |
| 🎮 Valorant | Riot / third-party API | ✅ Live |
| Others | — | 🔧 Stub (ready to connect) |

---

## Authentication

- **Register / Login** via email + password
- Passwords hashed with **bcrypt**
- Auth token issued as **JWT**, stored in a cookie
- The `/profile` route is protected on the frontend — only visible when logged in
- The `/register` route is hidden once logged in

---

## Pages and Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home | No |
| `/sports` | Sports Hub | No |
| `/games` | Games Hub | No |
| `/live` | Live Scores | No |
| `/profile` | User Profile | ✅ Yes |
| `/register` | Sign Up | ❌ (hidden if logged in) |
| `/sports/football` | Football fixtures | No |
| `/sports/basketball` | Basketball games | No |
| `/sports/hockey` | Hockey games | No |
| `/sports/baseball` | Baseball games | No |
| `/sports/formula-1` | F1 races | No |
| `/sports/cricket` | Cricket | No |
| `/sports/tennis` | Tennis | No |
| `/sports/badminton` | Badminton | No |
| `/sports/volleyball` | Volleyball | No |
| `/sports/kabaddi` | Kabaddi | No |
| `/sports/golf` | Golf | No |
| `/sports/chess` | Chess | No |
| `/sports/table-tennis` | Table Tennis | No |
| `/games/valorant` | Valorant | No |

---

## Design System

The project uses a custom Tailwind CSS design token system defined in `index.css`:

- **`bg-surface-900`** — dark background
- **`glass`** — glassmorphism card style
- **`text-live` / `bg-live`** — red for live/in-progress status
- **`text-win` / `bg-win`** — green for finished/won status
- **`text-upcoming` / `bg-upcoming`** — muted for scheduled matches
- **`text-accent` / `bg-accent`** — primary brand accent color

---

## Roadmap

- [ ] Connect Cricket, Tennis, Badminton, Golf APIs
- [ ] Real live scores on the Live page (currently mock data)
- [ ] Add more esports (CS2, League of Legends, Dota 2)
- [ ] ML-powered personalized sport recommendations
- [ ] User favorites & saved teams
- [ ] Push notifications for live match alerts

---

## License

ISC — see [package.json](./back/package.json)

---

## Author

**Jeevant & Deepesh** — [GitHub](https://github.com/Jeevant010/GGStats)
