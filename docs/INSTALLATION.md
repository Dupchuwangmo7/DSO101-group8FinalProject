# Installation Guide

Complete setup instructions for Semzung Mental Health Support Platform.

## 📋 Prerequisites

### System Requirements
- **OS**: macOS, Linux, or Windows with WSL2
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 10GB free
- **Internet**: Required for MongoDB Atlas and npm packages

### Software Requirements
- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: ([Download](https://git-scm.com/))
- **Docker**: v20.0 or higher ([Download](https://www.docker.com/))
- **Docker Compose**: v1.29 or higher
- **MongoDB Atlas Account**: Free tier ([Register](https://www.mongodb.com/cloud/atlas))

### Verify Installation

```bash
# Check Node.js
node --version  # Should be v18.0.0+

# Check npm
npm --version  # Should be v9.0.0+

# Check Docker
docker --version

# Check Docker Compose
docker-compose --version

# Check Git
git --version
```

## 🔧 Setup MongoDB Atlas

### Step 1: Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with email or Google account

### Step 2: Create Cluster
1. Click "Create" cluster
2. Select "Shared" (Free tier)
3. Choose region closest to you
4. Click "Create"
5. Wait 2-3 minutes for cluster creation

### Step 3: Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Enter credentials:
   - **Username**: `semzung_user`
   - **Password**: Generate secure password (copy it!)
   - **Role**: `readWriteAnyDatabase`
4. Click "Create User"

### Step 4: Get Connection String
1. Go to "Clusters" → "Connect"
2. Choose "Drivers" (Node.js)
3. Copy the connection string
4. Replace `<username>` and `<password>` with your credentials
5. Replace `<database>` with `semzung`

Example:
```
mongodb+srv://semzung_user:YOUR_PASSWORD@cluster0.mongodb.net/semzung?retryWrites=true&w=majority
```

### Step 5: Whitelist IP Address
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

## 💻 Clone Repository

```bash
# Clone the repository
git clone https://github.com/your-username/semzung.git

# Navigate to project directory
cd semzung

# List contents
ls -la
```

## 📦 Backend Installation

### 1. Navigate to Backend

```bash
cd backend
```

### 2. Create Environment File

```bash
# Copy example env
cp .env.example .env

# Edit environment variables
nano .env  # or use your editor
```

### 3. Configure .env

```env
# Server
NODE_ENV=development
PORT=5002

# Database (from MongoDB Atlas)
MONGODB_URI=mongodb+srv://semzung_user:YOUR_PASSWORD@cluster0.mongodb.net/semzung

# JWT (generate with: openssl rand -base64 32)
JWT_SECRET=your_random_secret_here_min_32_chars
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Verify Backend

```bash
# Start server
npm run dev

# Check logs for:
# ✅ MongoDB Connected: ...
# ✅ Server running on: http://localhost:5002

# Test health endpoint
curl http://localhost:5002/health

# Should return: {"status":"OK",...}

# Stop with: Ctrl+C
```

## 🎨 Frontend Installation

### 1. Navigate to Frontend

```bash
cd ../frontend
```

### 2. Create Environment File

```bash
cp .env.example .env

nano .env
```

### 3. Configure .env

```env
# API Configuration
VITE_API_URL=http://localhost:5002

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DARK_MODE=true
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Verify Frontend

```bash
# Start development server
npm run dev

# Navigate to: http://localhost:5173

# You should see the Semzung homepage
```

## 🐳 Docker Installation

### Prerequisites
- Docker Desktop installed and running

### Step 1: Build and Start

```bash
# Navigate to project root
cd semzung

# Build and start all services
docker-compose up --build

# First run takes 2-3 minutes
```

### Step 2: Verify Services

In a new terminal:

```bash
# Check running containers
docker-compose ps

# Should show:
# - semzung_frontend_1  (port 80)
# - semzung_backend_1   (port 5002)

# View logs
docker-compose logs -f

# Test backend
curl http://localhost:5002/health

# Test frontend
curl http://localhost
```

### Step 3: Access Application

- **Frontend**: http://localhost
- **Backend API**: http://localhost:5002/api

## ✅ Verification Checklist

### Backend Checks
- [ ] Node.js v18+ installed
- [ ] `npm install` completed
- [ ] `.env` configured with MongoDB URI
- [ ] `npm run dev` starts without errors
- [ ] `curl http://localhost:5002/health` returns 200

### Frontend Checks
- [ ] Node.js v18+ installed
- [ ] `npm install` completed
- [ ] `.env` configured with API URL
- [ ] `npm run dev` starts without errors
- [ ] http://localhost:5173 loads in browser

### Database Checks
- [ ] MongoDB Atlas account created
- [ ] Cluster running
- [ ] Database user created
- [ ] IP address whitelisted
- [ ] Connection string verified

### Docker Checks
- [ ] Docker Desktop running
- [ ] `docker-compose up --build` completes
- [ ] `docker-compose ps` shows 2 containers
- [ ] Frontend and backend both accessible

## 🧪 Test the Application

### 1. Register New User

```bash
curl -X POST http://localhost:5002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {...}
}
```

### 2. Login

```bash
curl -X POST http://localhost:5002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### 3. Access Protected Route

```bash
# Use the token from login
curl http://localhost:5002/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 4. Test Frontend

1. Open http://localhost:5173
2. Click "Sign Up Free"
3. Fill registration form
4. Submit
5. Should redirect to dashboard

## 🔧 Development Workflow

### Running Both Frontend and Backend

**Option 1: Two Terminals (Recommended)**

Terminal 1:
```bash
cd backend
npm run dev
```

Terminal 2:
```bash
cd frontend
npm run dev
```

**Option 2: Docker Compose**

```bash
docker-compose up --build
```

### Making Changes

- **Backend**: Changes auto-reload with `nodemon`
- **Frontend**: Changes auto-reload with Vite HMR
- **Docker**: Rebuild with `docker-compose build`

## 📚 Common Issues

### MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Verify MongoDB URI in .env
- Check IP whitelist in MongoDB Atlas
- Use full connection string: `mongodb+srv://...`

### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**:
- Verify FRONTEND_URL in backend .env
- Frontend running on port 5173
- Backend running on port 5002

### Port Already in Use
```
Error: listen EADDRINUSE :::5002
```
**Solution**:
```bash
# Find and kill process using port 5002
lsof -ti:5002 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

### Docker Port Conflicts
```bash
# Check running containers
docker ps

# Stop specific container
docker-compose down

# Remove all containers
docker system prune -a
```

## 🎓 Next Steps

1. **Read Documentation**:
   - [API Documentation](./docs/API.md)
   - [Architecture Guide](./docs/ARCHITECTURE.md)

2. **Explore Features**:
   - Register and login
   - Track mood
   - Create journal entries
   - View community posts

3. **Customize**:
   - Modify color scheme in `tailwind.config.js`
   - Add new API endpoints
   - Extend database models

4. **Deploy**:
   - See [DEPLOYMENT.md](./docs/DEPLOYMENT.md)
   - Deploy to Railway, Render, or Fly.io

## 📞 Getting Help

1. Check [Troubleshooting Guide](./docs/DEPLOYMENT.md#troubleshooting)
2. Review error messages in console
3. Check MongoDB Atlas connection
4. Open GitHub Issue with error logs

---

**You're all set! 🎉 Happy coding!**
