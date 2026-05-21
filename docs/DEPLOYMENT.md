# Deployment Guide

Production deployment instructions for Semzung.

## 🚀 Deployment Platforms

### 1. Railway (Recommended for Beginners)

**Easy setup, great for Node.js + MongoDB**

#### Step 1: Setup Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"

#### Step 2: Deploy Backend
1. Click "Deploy from GitHub"
2. Select your Semzung repository
3. Configure environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=your_railway_frontend_url
   ```
4. Railway auto-deploys on push to main

#### Step 3: Deploy Frontend
1. Create new service
2. Set environment:
   ```
   VITE_API_URL=your_railway_backend_url
   ```
3. Add build command: `npm run build`
4. Add start command: `npm run preview`

#### Step 4: Connect Services
- Railway auto-detects port from `PORT` env
- Frontend should proxy to backend API

**Railway Docs**: https://docs.railway.app/

---

### 2. Render

**Free tier available, good alternative**

#### Step 1: Create Backend Service
1. Go to [Render.com](https://render.com)
2. Click "New Web Service"
3. Connect GitHub repository
4. Select backend directory: `backend`
5. Set environment:
   ```
   NODE_ENV=production
   MONGODB_URI=...
   JWT_SECRET=...
   FRONTEND_URL=...
   ```
6. Build command: `npm install`
7. Start command: `npm start`

#### Step 2: Create Frontend Service
1. New "Static Site"
2. Connect repository
3. Set root directory: `frontend`
4. Build command: `npm run build`
5. Publish directory: `dist`

#### Step 3: Connect API
Update `vite.config.js`:
```javascript
VITE_API_URL: process.env.RENDER_EXTERNAL_URL
```

**Render Docs**: https://docs.render.com/

---

### 3. Fly.io

**Global edge deployment**

#### Step 1: Install Fly CLI
```bash
# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh

# Verify
flyctl version
```

#### Step 2: Create Account
```bash
flyctl auth login
```

#### Step 3: Deploy Backend
```bash
cd backend
flyctl launch

# Follow prompts:
# - App name: semzung-backend
# - Region: Choose closest to you
# - Database: No (use MongoDB Atlas)
```

#### Step 4: Set Secrets
```bash
flyctl secrets set \
  MONGODB_URI="your_mongodb_uri" \
  JWT_SECRET="your_jwt_secret" \
  FRONTEND_URL="https://semzung-frontend.fly.dev"
```

#### Step 5: Deploy Frontend
```bash
cd ../frontend
flyctl launch

# Configure for static site
flyctl deploy
```

**Fly.io Docs**: https://fly.io/docs/

---

## 🔐 Environment Configuration

### Production Environment Variables

**Backend** (`backend/.env` or platform secrets):
```env
NODE_ENV=production
PORT=5002

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/semzung

# Security
JWT_SECRET=generate_secure_random_string_32_chars_minimum
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=https://your-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Optional
CLOUDINARY_NAME=...
EMAIL_SERVICE=...
```

**Frontend** (build-time variables):
```env
VITE_API_URL=https://api.your-domain.com
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_DARK_MODE=true
```

---

## 📋 Pre-Deployment Checklist

- [ ] All tests passing locally
- [ ] `.env` configured with production values
- [ ] JWT_SECRET is strong (32+ random characters)
- [ ] MongoDB Atlas cluster running
- [ ] IP whitelist includes deployment provider
- [ ] Frontend API URL points to production backend
- [ ] CORS configured for production domain
- [ ] All dependencies installed
- [ ] Build succeeds: `npm run build`
- [ ] Health checks working

---

## 🔄 CI/CD Automatic Deployment

### GitHub Actions Setup

#### Step 1: Add Secrets to GitHub
1. Go to repo → Settings → Secrets
2. Add secrets:
   ```
   DOCKER_USERNAME=your_dockerhub_username
   DOCKER_PASSWORD=your_dockerhub_password
   DEPLOY_TOKEN=your_railway_token
   DEPLOY_URL=your_deployment_webhook
   ```

#### Step 2: Workflow Configuration
Edit `.github/workflows/ci-cd.yml`:

```yaml
deploy:
  needs: build-images
  runs-on: ubuntu-latest
  steps:
    - name: Deploy to Railway
      run: |
        curl -X POST ${{ secrets.DEPLOY_URL }} \
          -H "Authorization: Bearer ${{ secrets.DEPLOY_TOKEN }}"
```

#### Step 3: Push and Test
```bash
git add .
git commit -m "Enable auto deployment"
git push origin main

# Watch Actions tab for workflow status
```

---

## 📊 Monitoring

### Health Checks

```bash
# Backend
curl https://your-api.com/health

# Frontend (check home page)
curl https://your-domain.com/

# API endpoint
curl https://your-api.com/api
```

### Logs

**Railway**:
```bash
railway logs
railway logs -t backend
```

**Render**:
- View in dashboard → Logs

**Fly.io**:
```bash
flyctl logs
```

### Metrics

**Monitor**:
- CPU/Memory usage
- Response times
- Error rates
- Database connection pool

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Check logs
railway logs

# Common issues:
# 1. MONGODB_URI invalid
# 2. PORT already in use
# 3. Missing dependencies
```

### CORS errors in production
```bash
# Verify FRONTEND_URL in backend .env
# Should match your frontend domain exactly

# Example:
FRONTEND_URL=https://semzung-frontend.fly.dev
```

### Database connection timeout
```bash
# Whitelist deployment provider IP
# 1. Go to MongoDB Atlas → Network Access
# 2. Add IP of deployment platform
# 3. For Railway/Render/Fly: "Allow from Anywhere"
```

### Frontend can't reach backend
```bash
# Check VITE_API_URL in frontend build
# Verify backend is responding
curl https://your-api.com/health
```

---

## 🔒 SSL/HTTPS

### Automatic (Railway, Render, Fly.io)
All platforms provide free SSL certificates. Enable HTTPS:
- Railway: Auto-enabled
- Render: Auto-enabled for custom domains
- Fly.io: Auto-enabled on `fly.dev` domains

### Custom Domain
1. Add domain to DNS
2. Point to platform
3. SSL auto-provisioned (takes ~5-10 min)

---

## 📈 Scaling

### Horizontal Scaling
```bash
# Railway
railway scale backend=2  # 2 instances

# Fly.io
flyctl scale count 3  # 3 instances
```

### Performance Tips
1. **Cache static assets** (1 year)
2. **Compress responses** (gzip)
3. **Use CDN** for frontend
4. **Optimize database queries**
5. **Monitor and alert** on issues

---

## 💰 Cost Estimates

### MongoDB Atlas
- Free tier: 512MB storage (perfect for MVP)
- Shared tier: $57/month

### Railway
- Free tier: $5 monthly credit
- Pay as you go after

### Render
- Free tier: Limited resources
- Paid: $7+/month per service

### Fly.io
- Free tier: 3 shared-cpu-1x 256MB VMs
- Paid: $0.003/hour per VM

---

## ✅ Post-Deployment

1. **Test all features**:
   - Register new user
   - Login
   - Create posts/journals
   - Track mood
   - Admin features

2. **Monitor for 24 hours**:
   - Check error rates
   - Monitor response times
   - Watch database usage

3. **Setup backups**:
   - MongoDB Atlas: Auto-backed up
   - Enable point-in-time recovery

4. **Enable monitoring**:
   - Set up alerts for errors
   - Monitor database performance
   - Track API usage

---

## 🔄 Continuous Deployment Workflow

```
1. Developer pushes to main branch
   ↓
2. GitHub Actions triggered
   ↓
3. Tests run (lint, build, security scan)
   ↓
4. Docker images built and pushed
   ↓
5. Deployment platform pulls images
   ↓
6. New version deployed to production
   ↓
7. Health checks verify success
```

---

## 🆘 Support

- [Railway Documentation](https://docs.railway.app/)
- [Render Docs](https://docs.render.com/)
- [Fly.io Docs](https://fly.io/docs/)
- [MongoDB Atlas Help](https://docs.mongodb.com/atlas/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Deployment successful! 🎉**

Your Semzung app is now live!
