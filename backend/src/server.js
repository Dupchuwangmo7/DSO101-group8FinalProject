/**
 * Semzung Backend Server
 * Main application entry point
 * 
 * DevOps Features:
 * - Environment-based configuration
 * - Security middleware (Helmet, CORS, Rate Limiting)
 * - Comprehensive error handling
 * - Health check endpoint for monitoring
 * - Graceful shutdown
 */

require('dotenv').config();
require('express-async-errors');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const moodRoutes = require('./routes/moodRoutes');
const journalRoutes = require('./routes/journalRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// ==========================================
// DATABASE CONNECTION
// ==========================================
connectDB();

// ==========================================
// SECURITY MIDDLEWARE
// ==========================================

// Helmet: Secures Express app with various HTTP headers
app.use(helmet());

// CORS: Enable cross-origin requests from frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate Limiting: Prevent brute force attacks
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit auth attempts
  message: 'Too many authentication attempts, please try again later.'
});

// ==========================================
// BODY PARSING MIDDLEWARE
// ==========================================
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// ==========================================
// ROUTES
// ==========================================

// Health check endpoint (for monitoring & Docker health checks)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Info endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    name: 'Semzung API',
    version: '1.0.0',
    description: 'Mental Health Support Platform API'
  });
});

// Auth routes with stricter rate limiting
app.use('/api/auth', authLimiter, authRoutes);

// Public and protected routes
app.use('/api/posts', postRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/admin', adminRoutes);

// ==========================================
// ERROR HANDLING
// ==========================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use(errorHandler);

// ==========================================
// SERVER STARTUP
// ==========================================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║   🧠 Semzung Backend Server          ║
  ║   Mental Health Support Platform     ║
  ╚══════════════════════════════════════╝
  
  ✅ Server running on: http://localhost:${PORT}
  🌍 Environment: ${process.env.NODE_ENV || 'development'}
  🔐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}
  
  📚 API Documentation:
     - Health Check: GET /health
     - API Info: GET /api
     - Auth Routes: /api/auth
     - Posts Routes: /api/posts
     - Mood Routes: /api/mood
     - Journal Routes: /api/journal
     - Admin Routes: /api/admin
  `);
});

// ==========================================
// GRACEFUL SHUTDOWN
// ==========================================

process.on('SIGTERM', () => {
  console.log('📛 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📛 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app;
