# System Architecture

Technical architecture and design decisions for Semzung.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              React Frontend (Vite)                       │  │
│  │  - Components: Navbar, Forms, Pages                      │  │
│  │  - Routing: React Router v6                              │  │
│  │  - State: Context API + Custom Hooks                     │  │
│  │  - Styling: Tailwind CSS                                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                            ↓ HTTPS/REST                         │
├─────────────────────────────────────────────────────────────────┤
│              REVERSE PROXY LAYER (Nginx)                        │
│  - Static file serving                                          │
│  - Gzip compression                                             │
│  - Security headers                                             │
│  - API proxy (optional)                                         │
└─────────────────────────────────────────────────────────────────┘
                            ↓ HTTP
┌─────────────────────────────────────────────────────────────────┐
│                     API LAYER                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          Express.js Server (Node.js)                     │  │
│  │                                                          │  │
│  │  Routes:                                                 │  │
│  │  ├─ /api/auth      - Authentication                     │  │
│  │  ├─ /api/posts     - Community posts                    │  │
│  │  ├─ /api/mood      - Mood tracking                      │  │
│  │  ├─ /api/journal   - Journal entries                    │  │
│  │  └─ /api/admin     - Admin functions                    │  │
│  │                                                          │  │
│  │  Middleware:                                             │  │
│  │  ├─ Authentication (JWT)                                │  │
│  │  ├─ Validation (Joi)                                    │  │
│  │  ├─ Error Handling                                      │  │
│  │  ├─ Rate Limiting                                       │  │
│  │  └─ CORS                                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                     ↓                       ↓                    │
├───────────────────────────────────────────────────────────────┤
│              DATA LAYER                                         │
│  ┌──────────────────────────────┐  ┌─────────────────────────┐│
│  │   Mongoose Models            │  │  MongoDB Atlas (Cloud)  ││
│  │   ├─ User                    │  │  ├─ Users              ││
│  │   ├─ Post                    │  │  ├─ Posts              ││
│  │   ├─ MoodLog                 │  │  ├─ MoodLogs           ││
│  │   └─ Journal                 │  │  └─ Journals           ││
│  └──────────────────────────────┘  └─────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## 🐳 Container Architecture

### Docker Compose Services

```
semzung-network (bridge)
│
├─ Frontend Container
│  ├─ Port: 80
│  ├─ Image: Node.js 18 → Nginx (multi-stage)
│  ├─ Volume: dist/ (built files)
│  └─ Health: HTTP check on /
│
└─ Backend Container
   ├─ Port: 5000
   ├─ Image: Node.js 18-alpine
   ├─ Volume: none (stateless)
   └─ Health: HTTP check on /health
```

**Note**: MongoDB Atlas (cloud) - not containerized locally.

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum ['user', 'admin'],
  bio: String,
  avatar: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `email` (unique), `createdAt`

---

### Posts Collection
```javascript
{
  _id: ObjectId,
  author: ObjectId (ref: User),
  title: String,
  content: String,
  category: Enum ['anxiety', 'depression', 'stress', 'motivation', 'general'],
  isAnonymous: Boolean,
  likes: Number,
  comments: Number,
  status: Enum ['active', 'flagged', 'removed'],
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `createdAt DESC`, `category`, `author`

---

### MoodLogs Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  mood: Enum ['terrible', 'bad', 'okay', 'good', 'excellent'],
  intensity: Number (1-10),
  note: String,
  triggers: [String],
  activities: [String],
  createdAt: Date
}
```

**Indexes**: `user`, `createdAt DESC` (compound)

---

### Journals Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  title: String,
  content: String,
  mood: Enum,
  tags: [String],
  isPrivate: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes**: `user`, `createdAt DESC` (compound)

## 🔐 Security Architecture

### Authentication Flow

```
1. User Registration
   ├─ Input validation (Joi)
   ├─ Check email unique
   ├─ Hash password (bcrypt)
   ├─ Store in database
   └─ Return JWT token

2. User Login
   ├─ Find user by email
   ├─ Compare password (bcryptjs)
   ├─ Generate JWT token (sign with secret)
   ├─ Return token + user info
   └─ Client stores token in localStorage

3. Protected Requests
   ├─ Extract token from header
   ├─ Verify JWT signature
   ├─ Check expiration
   ├─ Decode payload to get userId
   └─ Attach user to request

4. Token Expiration
   ├─ Default: 7 days
   ├─ Auto-logout if expired
   ├─ Prompt re-login
   └─ Clear localStorage
```

### Security Headers (Helmet)

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: ...
Referrer-Policy: no-referrer-when-downgrade
```

### Input Validation

All endpoints validate with Joi:
- Type checking
- Length limits
- Format validation
- Custom rules

## 🔄 API Request Flow

```
HTTP Request (Frontend)
    ↓
Nginx (Reverse Proxy)
    ├─ SSL termination
    ├─ Gzip compression
    └─ Static file serving
    ↓
Express.js Server
    ├─ CORS middleware
    ├─ Body parsing
    ├─ Rate limiting check
    ├─ Route matching
    ↓
Authentication Middleware (if protected)
    ├─ Extract token
    ├─ Verify JWT
    └─ Attach user to req
    ↓
Validation Middleware
    ├─ Joi schema validation
    └─ Sanitize input
    ↓
Controller Handler
    ├─ Business logic
    ├─ Database query (Mongoose)
    └─ Response generation
    ↓
Error Handler Middleware
    ├─ Catch errors
    ├─ Format response
    └─ Log errors
    ↓
HTTP Response (Frontend)
```

## 📁 Code Organization

### Backend Structure

**MVC Pattern** (Modified for REST):

```
Controllers (Request → Logic → Response)
├─ authController: Register, Login, Profile
├─ postController: CRUD posts
├─ moodController: Mood tracking
├─ journalController: Journal entries
└─ adminController: Admin operations

Routes (HTTP Methods → Controllers)
├─ authRoutes
├─ postRoutes
├─ moodRoutes
├─ journalRoutes
└─ adminRoutes

Models (Mongoose Schemas)
├─ User
├─ Post
├─ MoodLog
└─ Journal

Middleware (Request Processing)
├─ auth: JWT verification
├─ validation: Joi validation
└─ errorHandler: Error responses
```

### Frontend Structure

**Component-Based**:

```
Components (Reusable UI)
├─ Navbar: Navigation + theme toggle
├─ Card: Content container
└─ Forms: Input components

Pages (Full-page components)
├─ Home: Landing page
├─ Dashboard: User dashboard
├─ Community: Posts feed
├─ Journal: Journal entries
├─ Resources: Help resources
└─ AdminDashboard: Admin panel

Hooks (State & Effects)
├─ useAuth: Authentication context
└─ Custom hooks: Reusable logic

Utils (Helper functions)
├─ api.js: Axios instance + interceptors
└─ helpers: Utility functions
```

## 🔄 Data Flow Example: Mood Logging

```
User Interface (React)
        ↓
    Mood Form
        ↓ [onChange] Mood, Intensity
    State Update (React)
        ↓
    Submit Handler
        ↓ [POST /api/mood]
    API Call (Axios)
        ↓
    Express Route
        ↓
    verifyToken Middleware
        ├─ Extract JWT
        ├─ Verify signature
        └─ Set req.user.userId
        ↓
    validate('addMood') Middleware
        ├─ Schema validation
        └─ Sanitize input
        ↓
    moodController.addMood()
        ├─ Create MoodLog object
        ├─ MoodLog.create(data)
        └─ Return JSON response
        ↓
    MongoDB Atlas
        ├─ Insert document
        └─ Return created doc
        ↓
    Response to Client (200 + JSON)
        ↓
    Frontend State Update
        ├─ Success message
        ├─ Clear form
        └─ Fetch updated stats
```

## 🚀 Deployment Architecture

### Development
```
git push
    ↓
GitHub Actions (CI/CD)
    ├─ Lint & Test
    ├─ Build Docker images
    └─ Push to Docker Hub
    ↓
Docker Compose (Local)
    ├─ Frontend (port 80)
    └─ Backend (port 5002)
```

### Production (Railway Example)
```
git push → main branch
    ↓
GitHub Actions
    ├─ Tests
    ├─ Build image
    └─ Push to registry
    ↓
Railway
    ├─ Pull image
    ├─ Deploy container
    └─ Health check
    ↓
Production Environment
    ├─ Frontend (https://frontend.railway.app)
    ├─ Backend (https://backend.railway.app)
    └─ MongoDB Atlas (Cloud)
```

## 📊 Scalability Considerations

### Current Architecture (1-100 MAU)
- Single backend instance
- Single frontend instance
- MongoDB shared cluster

### Horizontal Scaling (100-1000 MAU)
- Load balancer (Nginx)
- Multiple backend instances
- Dedicated MongoDB replica set
- Redis cache layer

### High Scale (1000+ MAU)
- Kubernetes orchestration
- Auto-scaling groups
- Database sharding
- CDN for static assets
- Dedicated analytics platform

## 🔍 Monitoring & Observability

### Health Checks
- Backend: `/health` endpoint (HTTP 200)
- Database: Connection timeout monitoring
- Frontend: Load time tracking

### Metrics
- API response time
- Error rates
- Database query performance
- User activity

### Logging
- Express: Request/response logs
- Errors: Stack traces with context
- Security: Auth attempts, rate limits

## 🛡️ Backup & Disaster Recovery

### Data Backup
- MongoDB Atlas: Automatic daily snapshots
- Retention: 7 days default
- Point-in-time recovery: 24-hour window

### Deployment Backup
- Docker images tagged with version
- GitHub: Source code backup
- Railway/Render: Automated rollback

---

This architecture is production-ready while remaining simple enough for learning!
