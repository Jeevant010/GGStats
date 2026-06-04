# GGStats Backend 🖥️

This is the Node.js + Express backend API server for **GGStats**. 

It handles authentication, session token distribution, user database management, and aggregates esports schedules (like CS2 matches scraped from HLTV) with robust error resilience.

---

## 📁 Layered Architecture

The backend code is organized under the `back/src/` directory to separate concerns cleanly:

```text
src/
├── server.js           # Server listener, DB initialization, and partial index setup
├── app.js              # Express app definition, CORS, helmet, and error middleware wiring
│
├── config/             # Environment, Database client, and Passport authentication strategies
│
├── models/             # Mongoose schemas (User, Admin, Game) with automatic bcrypt hashing
│
├── middlewares/        # Middlewares (Auth check token guards, Global error formatting handler)
│
├── controllers/        # Request handlers mapping payloads to services
│
├── services/           # Business logic layer (authentication services, external API fetches)
│
├── routes/             # Express routing mapping endpoints to controllers
│
└── utils/              # Common utilities and token creation helper functions
```

---

## ⚙️ Setup & Configuration

### Prerequisites
- Node.js ≥ 18
- A MongoDB cluster instance (local or Atlas)

### 1. Installation
Navigate to the backend folder and install the dependencies:
```bash
cd back
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `back/` directory:
```env
PORT=9000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/GGStatsCollection
TOKEN=YourSuperSecretJWTKey
CORS_ORIGIN=http://localhost:5173
```
*Note: Critical environment variables (`MONGO_URI` and `TOKEN`) are validated at startup. The server will throw a descriptive error and refuse to initialize if these variables are missing.*

### 3. Start the Server
Start the Express API:
```bash
npm start
# Server starts running at http://localhost:9000
```

---

## 🔒 Key Engineering Protections

* **Bcrypt Pre-Save Hashing**: Integrated automatic hashing inside the `User` schema. Registration and password-change handlers process plain text passwords and let Mongoose safely hash them on save, preventing double-hashing bugs.
* **Safe Token Handlers**: Token creation (`getToken`) checks the input user object and ensures `_id` is present before signing payloads, preventing runtime crashes on malformed data.
* **Email Normalization**: Centralized email cleaning via a `normalizeEmail` helper to guarantee trimmed, lowercase lookups, preventing inconsistent lookups.
* **Robust HLTV Integration**: Fetching CS2 matches (`getCS2Matches`) employs a 3-attempt retry-with-backoff loop and an 8-second request timeout via `Promise.race`, returning a safe empty array on failure instead of stalling threads.
* **Database Startup Guards**: Schema partial unique index creations are wrapped in try-catch loops to prevent database startup promise rejections from crashing the Express application.
