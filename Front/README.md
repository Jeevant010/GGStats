# GGStats Frontend 🏆

This is the React + Vite single-page application (SPA) frontend for the **GGStats** sports and esports analytics platform. 

It provides a rich, dark-themed responsive dashboard for checking live scores, schedules, tournaments, and news.

---

## 📁 Folder Structure

The frontend code resides in the `Front/src/` directory and is structured as follows:

```text
src/
├── App.css
├── App.jsx             # Root router mapping routes to page views
├── main.jsx            # Entry point initializing providers (AuthProvider, etc.)
├── index.css           # Global CSS and custom design tokens (dark mode, glassmorphism)
│
├── assets/             # Shared media assets (icons, background videos)
│
├── components/         # Reusable presentation and layout components
│   ├── common/         # Layout & shared widgets (Header, Footer, DatePicker, Logo, TypeNav)
│   └── home/           # Components specific to the home view (News, NewsCard, UpcomingEvents)
│
├── contexts/           # React Context state management (AuthContext)
│
├── services/           # Reusable API service instances (Axios configured client with interceptors)
│
├── hooks/              # Custom React hooks (useLiveScores, useBannerImages)
│
└── pages/              # Routing page views
    ├── Home.jsx        # Dashboard Hub
    ├── Live.jsx        # Live scores dashboard
    ├── Profile.jsx     # Auth-gated user profile
    ├── SignUp.jsx      # Login and Registration portal
    ├── sports/         # 13 Detailed sports pages (Football, Basketball, Hockey, etc.)
    └── games/          # 2 Detailed esports pages (CS2, Valorant)
```

---

## ⚙️ Configuration & Setup

### Prerequisites
- Node.js ≥ 18
- An API Key from [api-sports.io](https://api-sports.io/) (used for live sports fixtures)

### 1. Installation
Navigate to the frontend folder and install the dependencies:
```bash
cd Front
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `Front/` directory:
```env
VITE_SPORTS_API_KEY=your_api_sports_key_here
VITE_VALORANT_SCHEDULE_API=your_optional_henrikdev_val_api_key
```

### 3. Local Development
Start the Vite development server:
```bash
npm run dev
# Application starts at http://localhost:5173
```

### 4. Build for Production
Generate the optimized production build:
```bash
npm run build
```

---

## 🎨 Key Features & Design Details

* **Dynamic DatePicker**: Supports local state tracking to prevent stale references on midnight rollovers, recalculating dates upon click and periodically.
* **Resilient Image Handling**: Custom React states handle team logo load errors gracefully by rendering abbreviation-based circular fallbacks.
* **Axios Interceptors**: The configured Axios client handles token authorization (`Bearer <token>`) automatically and retries failed requests if access tokens expire.
* **Responsive Mobile Navigation**: Handled cleanly with location-matching active checks that support parent route highlighting for child routes.
