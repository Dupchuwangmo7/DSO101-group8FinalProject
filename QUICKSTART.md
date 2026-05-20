# Development Quick Start

Quick reference for developers.

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/username/semzung.git && cd semzung

# Setup backend
cd backend && cp .env.example .env && npm install && npm run dev

# Setup frontend (new terminal)
cd frontend && cp .env.example .env && npm install && npm run dev

# Visit http://localhost:5173
```

## 🐳 Docker Quick Start

```bash
# Copy env
cp .env.example .env

# Build and start
docker-compose up --build

# Visit http://localhost
```

## 📁 Key Files

```
Backend Entry:         backend/src/server.js
Frontend Entry:        frontend/src/main.jsx
Database Config:       backend/src/config/database.js
API Routes:            backend/src/routes/
React Pages:           frontend/src/pages/
Docker Config:         docker-compose.yml
CI/CD Workflow:        .github/workflows/ci-cd.yml
```

## 🔧 Common Commands

### Backend
```bash
npm run dev              # Development server
npm test                 # Run tests
npm run lint             # Lint code
npm start                # Production server
```

### Frontend
```bash
npm run dev              # Development server
npm run build            # Production build
npm run preview          # Preview build
npm run lint             # Lint code
```

### Docker
```bash
docker-compose up        # Start services
docker-compose down      # Stop services
docker-compose logs -f   # View logs
docker-compose ps        # List services
```

## 📊 Database

### MongoDB Atlas
1. Create free cluster
2. Create user `semzung_user`
3. Get connection string
4. Add to `.env`

### Local Testing
```bash
# Connect with MongoDB Compass
mongodb://localhost:27017/semzung
```

## 🔐 Environment Variables

### Required
- `MONGODB_URI` - Database connection
- `JWT_SECRET` - Security key (32+ chars)
- `FRONTEND_URL` - Frontend origin
- `VITE_API_URL` - Backend API URL

### Optional
- `CLOUDINARY_*` - Image uploads
- `EMAIL_*` - Email service
- `RATE_LIMIT_*` - API limits

## 🧪 Testing API

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"Pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Pass123"}'

# Create Post
curl -X POST http://localhost:5000/api/posts \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Content","category":"general","isAnonymous":true}'
```

## 🐛 Debugging

### VS Code
1. Add breakpoints
2. Run: `npm run dev -- --inspect`
3. Open: `chrome://inspect`

### Network Issues
```bash
# Test API connectivity
curl -v http://localhost:5000/health

# Test database
mongosh "mongodb_connection_string"
```

## 📝 Project Structure

```
semzung/
├── backend/           # Node.js + Express API
│   └── src/
│       ├── server.js           (entry point)
│       ├── config/             (setup files)
│       ├── models/             (database schemas)
│       ├── middleware/         (auth, validation)
│       ├── controllers/        (business logic)
│       └── routes/             (API endpoints)
├── frontend/          # React + Vite UI
│   └── src/
│       ├── main.jsx            (entry point)
│       ├── App.jsx             (router setup)
│       ├── components/         (reusable UI)
│       ├── pages/              (full pages)
│       ├── hooks/              (custom hooks)
│       └── utils/              (helpers)
├── nginx/             # Reverse proxy config
├── docs/              # Documentation
├── .github/workflows/ # CI/CD pipeline
└── docker-compose.yml # Docker setup
```

## 🎯 Development Workflow

```
1. Create feature branch
   git checkout -b feature/name

2. Make changes & test locally
   npm run dev

3. Commit changes
   git commit -m "feat: description"

4. Push to branch
   git push origin feature/name

5. Open Pull Request
   - Link issue
   - Describe changes
   - Request review

6. Address feedback
   - Update code
   - Commit again
   - Tests must pass

7. Merge when approved
   git merge feature/name
```

## 🚀 Deployment

```bash
# Local Docker
docker-compose up -d

# Railway
railway deploy

# Render
git push  # Auto-deploys

# Fly.io
flyctl deploy
```

## 📚 Resources

- [API Docs](./docs/API.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Installation](./docs/INSTALLATION.md)
- [Deployment](./docs/DEPLOYMENT.md)

## ❓ Need Help?

1. Check documentation
2. Search existing issues
3. Open new issue with details
4. Ask in discussions

---

**Happy coding! 🚀**
