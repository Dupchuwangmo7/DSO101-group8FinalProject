# 🚀 Semzung — Quick Start Guide

Get the platform running locally in **under 10 minutes**.

---

## 📋 Prerequisites

- **Node.js 18+** ([download](https://nodejs.org/))
- **npm 9+** (comes with Node.js)
- **MongoDB Atlas account** (free) — [sign up here](https://www.mongodb.com/cloud/atlas/register)
- *(Optional)* Docker Desktop for the containerized setup

---

## 🗄️ Step 1 — Set up MongoDB Atlas (free)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a free **M0 cluster** (any region).
3. **Database Access** → Add Database User → choose username/password (save them).
4. **Network Access** → Add IP Address → "Allow access from anywhere" (`0.0.0.0/0`) for development.
5. **Database** → Connect → "Drivers" → copy the connection string.
   It looks like: `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

---

## ⚙️ Step 2 — Configure environment variables

### Backend

Open `backend/.env` and replace placeholders:

```env
NODE_ENV=development
PORT=5002

# Paste your MongoDB Atlas connection string here:
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/semzung?retryWrites=true&w=majority

# Generate a strong secret. On Mac/Linux:  openssl rand -base64 32
# On Windows PowerShell: [Convert]::ToBase64String((1..32 | %{[byte](Get-Random -Max 256)}))
JWT_SECRET=paste_a_long_random_string_here_at_least_32_characters
JWT_EXPIRE=7d

FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend

`frontend/.env` should already contain:

```env
VITE_API_URL=http://localhost:5002
```

---

## 📦 Step 3 — Install dependencies

Open **two terminals**.

**Terminal 1 — Backend:**
```bash
cd backend
npm install
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
```

---

## ▶️ Step 4 — Run both servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```
Wait for: `✅ Server running on: http://localhost:5002` and `✅ MongoDB Connected`

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
Wait for: `Local:   http://localhost:5173/`

---

## 🌐 Step 5 — Open the app

Visit **http://localhost:5173** in your browser.

1. Click **Sign Up** → create an account
2. You'll be redirected to your dashboard
3. Try logging your mood, writing a journal entry, and posting in the community!

---

## 👑 Creating an admin user

After signing up normally, promote yourself to admin via MongoDB Atlas:

1. Go to your cluster → **Browse Collections** → `semzung` → `users`
2. Find your user document
3. Edit the `role` field from `"user"` to `"admin"`
4. Log out and log back in — the **Admin** link appears in the navbar

---

## 🐳 Alternative: Docker setup

If you have Docker installed, you can skip steps 3-4:

```bash
# At project root, create a .env file (copy from .env.example):
cp .env.example .env
# Edit .env and add your MONGODB_URI and JWT_SECRET

docker-compose up --build
```

Frontend will be at `http://localhost` (port 80), backend at `http://localhost:5002`.

---

## 🩺 Troubleshooting

**"MongoDB connection error" / retries forever**
- Check your `MONGODB_URI` in `backend/.env`
- Verify you whitelisted your IP in MongoDB Atlas → Network Access
- Verify the username/password in the connection string is correct (no special chars unencoded)

**"Cannot find module" on `npm run dev`**
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Frontend can't reach backend (CORS or network errors)**
- Make sure backend is running on port 5002
- Check `VITE_API_URL=http://localhost:5002` in `frontend/.env`
- Make sure `FRONTEND_URL=http://localhost:5173` in `backend/.env`

**Port already in use**
- Change `PORT` in `backend/.env` to e.g. 5003, then update `VITE_API_URL` in `frontend/.env` to match

---

## 📁 Project structure

```
Semzung/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── config/       # Database connection
│   │   ├── controllers/  # Route handlers (auth, mood, journal, posts, admin)
│   │   ├── middleware/   # Auth, validation, error handling
│   │   ├── models/       # Mongoose schemas (User, MoodLog, Journal, Post)
│   │   ├── routes/       # Express routers
│   │   └── server.js     # Entry point
│   ├── .env              # ⚠️ Your secrets (gitignored)
│   └── package.json
├── frontend/             # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/   # Navbar
│   │   ├── pages/        # Home, Login, Register, Dashboard, MoodTracker, Journal, Community, Resources, Profile, AdminDashboard
│   │   ├── hooks/        # useAuth
│   │   └── utils/        # api.js (axios instance)
│   ├── .env              # VITE_API_URL
│   └── package.json
├── docker-compose.yml    # Container orchestration
└── .env.example          # Template for root-level env
```

---

## ✨ What's included

- 🔐 JWT authentication (register, login, profile)
- 😊 Mood tracking with intensity, notes, and 30-day stats
- 📝 Private journal entries
- 👥 Anonymous community posts (5 categories)
- 🛡️ Admin dashboard (user management, content moderation)
- 🌙 Dark mode
- 🔒 Helmet, CORS, rate limiting, bcrypt password hashing, Joi validation
- 🐳 Docker support

Happy building! 🚀
