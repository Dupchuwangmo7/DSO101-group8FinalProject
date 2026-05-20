# Semzung – Mental Health Support Platform 🧠

[![CI/CD Pipeline](https://github.com/your-username/semzung/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/your-username/semzung/actions)
[![Docker Compose](https://img.shields.io/badge/docker-compose-blue)](https://www.docker.com/)
[![MongoDB Atlas](https://img.shields.io/badge/database-MongoDB%20Atlas-green)](https://www.mongodb.com/cloud/atlas)

A **production-ready mental health support platform** designed for students. Built with modern DevOps practices, scalable architecture, and security-first approach.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Docker Deployment](#docker-deployment)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [CI/CD Pipeline](#cicd-pipeline)
- [Security](#security)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### User Features
- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 😊 **Mood Tracker** - Track daily mood and view analytics
- 📝 **Private Journal** - Write confidential journal entries
- 👥 **Anonymous Community** - Share experiences anonymously
- 📚 **Resources** - Access mental health resources and support
- 🌙 **Dark Mode** - Eye-friendly dark theme support

### Admin Features
- 👨‍💼 **User Management** - View and manage users
- 🛡️ **Content Moderation** - Flag and remove inappropriate content
- 📊 **Dashboard Analytics** - System-wide statistics and insights

### Security Features
- 🔒 **Encrypted Passwords** - bcryptjs hashing with salt rounds
- 🎫 **JWT Authentication** - Secure token-based auth
- 🛡️ **Helmet** - HTTP header security
- 🚫 **CORS Protection** - Cross-origin request validation
- 🔄 **Rate Limiting** - API throttling to prevent abuse
- ✅ **Input Validation** - Joi schema validation
- 🚨 **Error Handling** - Secure error messages

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **State Management**: React Context API

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: JWT + bcryptjs
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

### DevOps
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Registry**: Docker Hub
- **Orchestration**: Docker Compose
- **Monitoring**: Health Checks

## 📁 Project Structure

```
semzung/
├── frontend/                          # React + Vite application
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   ├── pages/                    # Page components (Home, Login, etc)
│   │   ├── hooks/                    # Custom React hooks (useAuth)
│   │   ├── utils/                    # Utility functions (API client)
│   │   ├── App.jsx                   # Main app component with routing
│   │   ├── index.css                 # Global styles
│   │   └── main.jsx                  # Entry point
│   ├── public/                       # Static files
│   ├── Dockerfile                    # Multi-stage build for production
│   ├── vite.config.js               # Vite configuration
│   ├── tailwind.config.js           # Tailwind configuration
│   └── package.json
│
├── backend/                           # Node.js + Express API
│   ├── src/
│   │   ├── config/                   # Configuration (database, etc)
│   │   ├── models/                   # Mongoose schemas
│   │   ├── middleware/               # Custom middleware
│   │   ├── controllers/              # Request handlers
│   │   ├── routes/                   # API routes
│   │   └── server.js                 # Express app setup
│   ├── Dockerfile                    # Multi-stage production build
│   ├── .env.example                  # Environment variables template
│   └── package.json
│
├── nginx/                             # Reverse proxy configuration
│   └── default.conf                  # Nginx server config
│
├── .github/workflows/                 # GitHub Actions CI/CD
│   └── ci-cd.yml                     # Automated pipeline
│
├── docker-compose.yml                 # Local development compose
├── docker-compose.prod.yml           # Production compose
├── .env.example                       # Environment template
├── README.md                          # This file
└── docs/                              # Additional documentation
    ├── INSTALLATION.md               # Setup guide
    ├── DEPLOYMENT.md                 # Deployment instructions
    ├── API.md                        # API documentation
    └── ARCHITECTURE.md               # System architecture
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Docker & Docker Compose** ([Download](https://www.docker.com/))
- **MongoDB Atlas Account** (free tier available)
- **Git**

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/semzung.git
cd semzung
```

#### 2. Setup Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your values
nano .env
```

#### 3. Install Backend Dependencies

```bash
cd backend
npm install
cp .env.example .env
# Edit backend/.env
cd ..
```

#### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
cp .env.example .env
# Edit frontend/.env
cd ..
```

#### 5. Run Locally (Without Docker)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

## 🐳 Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Building Individual Images

**Backend:**
```bash
cd backend
docker build -t semzung-backend:1.0.0 .
docker run -p 5000:5000 --env-file .env semzung-backend:1.0.0
```

**Frontend:**
```bash
cd frontend
docker build -t semzung-frontend:1.0.0 .
docker run -p 80:80 semzung-frontend:1.0.0
```

### Docker Compose Files

- **`docker-compose.yml`** - Development configuration
- **`docker-compose.prod.yml`** - Production configuration with MongoDB support

### Key Docker Features

✅ **Multi-stage builds** - Optimized image sizes  
✅ **Health checks** - Automated service monitoring  
✅ **Non-root users** - Enhanced security  
✅ **Environment variables** - Configuration management  
✅ **Volume persistence** - Data survival across restarts  
✅ **Network isolation** - Service communication layer  

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Cloud)

1. **Create Account**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Free tier (512MB storage)
3. **Create Database User**:
   - Username: `semzung_user`
   - Password: Generate secure password
4. **Get Connection String**:
   ```
   mongodb+srv://semzung_user:password@cluster0.mongodb.net/semzung?retryWrites=true&w=majority
   ```
5. **Set Environment Variable**:
   ```bash
   MONGODB_URI=mongodb+srv://semzung_user:password@cluster0.mongodb.net/semzung
   ```

### Collections

The system automatically creates these collections:

- **Users** - User accounts with authentication
- **Posts** - Anonymous community posts
- **MoodLogs** - Daily mood tracking entries
- **Journals** - Private journal entries

## 📡 API Documentation

### Authentication Endpoints

```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user (protected)
PUT    /api/auth/profile           Update profile (protected)
```

### Post Endpoints

```
GET    /api/posts                  Get all posts (public)
GET    /api/posts/:id              Get specific post (public)
POST   /api/posts                  Create post (protected)
DELETE /api/posts/:id              Delete post (protected/admin)
```

### Mood Tracker Endpoints

```
POST   /api/mood                   Add mood entry (protected)
GET    /api/mood/history           Get mood history (protected)
GET    /api/mood/stats             Get mood statistics (protected)
```

### Journal Endpoints

```
POST   /api/journal                Create journal entry (protected)
GET    /api/journal                Get user's journals (protected)
GET    /api/journal/:id            Get specific journal (protected)
PUT    /api/journal/:id            Update journal (protected)
DELETE /api/journal/:id            Delete journal (protected)
```

### Admin Endpoints

```
GET    /api/admin/users            Get all users (admin only)
DELETE /api/admin/post/:id         Delete post (admin only)
PUT    /api/admin/post/:id/flag    Flag post (admin only)
GET    /api/admin/dashboard        Get dashboard stats (admin only)
```

### Example Request

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'

# Create Post (with token)
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Feeling better today",
    "content": "...",
    "category": "motivation",
    "isAnonymous": true
  }'
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

**Triggers**: Push to `main` or `develop` branches, Pull requests

**Stages**:
1. **Lint & Test** - Code quality checks
2. **Build Docker Images** - Create production-ready containers
3. **Security Scan** - Trivy vulnerability scanning
4. **Deploy** - Automatic deployment to production

### Setting Up CI/CD

1. **Add GitHub Secrets**:
   ```
   DOCKER_USERNAME      - Docker Hub username
   DOCKER_PASSWORD      - Docker Hub password
   DEPLOY_TOKEN         - Deployment token
   DEPLOY_URL           - Deployment endpoint
   TEST_MONGODB_URI     - Test database URI
   ```

2. **View Workflow Status**:
   - GitHub → Actions tab → CI/CD Pipeline

3. **Custom Deployment**:
   - Edit `.github/workflows/ci-cd.yml`
   - Replace deploy step with your platform (Railway, Render, Fly.io)

## 🔐 Security Best Practices

### Implemented

✅ **Password Hashing** - bcryptjs with salt  
✅ **JWT Tokens** - 7-day expiration  
✅ **Input Validation** - Joi schema validation  
✅ **CORS** - Origin whitelisting  
✅ **Rate Limiting** - 100 requests per 15 minutes  
✅ **Helmet** - Security headers  
✅ **Environment Variables** - Sensitive data protection  
✅ **Error Handling** - No sensitive info in errors  
✅ **HTTPS Ready** - Nginx SSL support  

### Environment Variables (.env)

Never commit `.env` to Git. Use `.env.example` as template.

**Critical Variables**:
```
JWT_SECRET           - Strong random string (32+ chars)
MONGODB_URI          - Database connection string
FRONTEND_URL         - Allowed frontend origin
NODE_ENV             - Set to 'production' in prod
```

## 📚 Documentation

- **[INSTALLATION.md](./docs/INSTALLATION.md)** - Detailed installation guide
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deployment to Railway/Render/Fly.io
- **[API.md](./docs/API.md)** - Complete API reference
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture diagram

## 🚢 Deployment

### Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and connect
railway login
railway init

# Deploy
railway up
```

### Deploy to Render

1. Connect GitHub repository
2. Create new Web Service
3. Set environment variables
4. Deploy

### Deploy to Fly.io

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login and initialize
flyctl auth login
flyctl launch

# Deploy
flyctl deploy
```

## 📊 Monitoring

### Health Checks

```bash
# Backend
curl http://localhost:5000/health

# Frontend
curl http://localhost/

# Full API status
curl http://localhost:5000/api
```

### Docker Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# With timestamps
docker-compose logs -f --timestamps
```

## 🛠 Troubleshooting

### Backend won't connect to MongoDB
```bash
# Check MongoDB URI in .env
# Verify IP whitelist in MongoDB Atlas
# Test connection: mongodb://... in MongoDB Compass
```

### Frontend API calls failing
```bash
# Check VITE_API_URL in frontend/.env
# Verify backend is running on port 5000
# Check CORS configuration in backend/src/server.js
```

### Docker image build fails
```bash
# Clear Docker cache
docker system prune -a

# Rebuild
docker-compose build --no-cache

# Check Docker disk space
docker system df
```

## 📝 License

MIT License - See LICENSE file for details

## 👥 Contributing

Contributions welcome! Please:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

For issues and questions:
- Open GitHub Issues
- Check existing documentation
- Review API examples

## 🎓 For Students

This project demonstrates:
- ✅ Modern fullstack architecture
- ✅ DevOps best practices (Docker, CI/CD)
- ✅ Security implementation (JWT, validation, hashing)
- ✅ Database design (MongoDB, Mongoose)
- ✅ REST API design
- ✅ Frontend development (React, Tailwind)
- ✅ Code organization and documentation

Perfect for portfolio and learning!

---

**Built with ❤️ for mental health support**

Made for 3rd year software engineering students | Production-Ready DevOps Project
