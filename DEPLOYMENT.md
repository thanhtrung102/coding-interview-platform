# Deployment Guide

This guide covers deploying the Coding Interview Platform to production.

## Prerequisites

- GitHub repository: https://github.com/thanhtrung102/coding-interview-platform
- Docker support (all recommended platforms)
- Free tier available on all platforms

---

## Option 1: Render (Recommended ⭐)

### Why Render?
- ✅ Free tier with automatic SSL
- ✅ Native Docker support
- ✅ Auto-deploy from GitHub
- ✅ Easy environment variable management
- ✅ Built-in health checks

### Deployment Steps:

#### Method A: Using render.yaml (Easiest)

1. **Push code to GitHub** (already done ✅)
   ```bash
   git push origin master
   ```

2. **Create Render account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Blueprint**
   - Click "New" → "Blueprint"
   - Connect your GitHub repository: `thanhtrung102/coding-interview-platform`
   - Render will automatically detect `render.yaml`
   - Click "Apply"

4. **Configure Environment Variables** (if needed)
   - `NODE_ENV`: `production` (auto-set)
   - `PORT`: `5000` (auto-set)
   - `CORS_ORIGIN`: Will be set to your Render URL

5. **Deploy**
   - Render will automatically build and deploy
   - Build time: ~5-10 minutes
   - Your app will be available at: `https://coding-interview-platform.onrender.com`

#### Method B: Manual Setup

1. **Create Web Service**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect GitHub repository

2. **Configure Service**
   - Name: `coding-interview-platform`
   - Environment: `Docker`
   - Region: `Oregon` (or closest to you)
   - Branch: `master`
   - Docker Context: `.`
   - Dockerfile Path: `./Dockerfile`

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=5000
   CORS_ORIGIN=https://your-app.onrender.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete

### Post-Deployment:

- **Health Check**: Visit `https://your-app.onrender.com/health`
- **Create Session**: Visit `https://your-app.onrender.com` and click "Create New Session"
- **Auto-Deploy**: Enabled by default - pushes to `master` trigger redeployment

### Free Tier Limitations:
- Service spins down after 15 minutes of inactivity
- Cold start takes ~30 seconds
- Sufficient for demo/testing purposes

---

## Option 2: Railway

### Deployment Steps:

1. **Create Railway account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `thanhtrung102/coding-interview-platform`

3. **Configure**
   - Railway auto-detects Dockerfile
   - Set environment variables:
     ```
     NODE_ENV=production
     PORT=5000
     ```

4. **Generate Domain**
   - Go to Settings → Networking
   - Click "Generate Domain"

5. **Deploy**
   - Automatic on push to master

**Free Tier**: $5 credit, enough for ~500 hours

---

## Option 3: Fly.io

### Deployment Steps:

1. **Install Fly CLI**
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex

   # Mac/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login**
   ```bash
   fly auth login
   ```

3. **Launch App**
   ```bash
   cd coding-interview-platform
   fly launch
   ```
   - App name: `coding-interview-platform` (or custom)
   - Region: Choose closest
   - Decline Postgres/Redis for now

4. **Configure fly.toml** (auto-generated)
   ```toml
   app = "coding-interview-platform"

   [build]
     dockerfile = "Dockerfile"

   [[services]]
     internal_port = 5000
     protocol = "tcp"

     [[services.ports]]
       handlers = ["http"]
       port = 80

     [[services.ports]]
       handlers = ["tls", "http"]
       port = 443
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

6. **Open App**
   ```bash
   fly open
   ```

**Free Tier**: 3 shared-cpu VMs, 3GB storage

---

## Option 4: Vercel (Frontend) + Render (Backend)

For completely separate frontend/backend deployment:

### Frontend (Vercel):

1. **Deploy Frontend**
   ```bash
   cd client
   vercel
   ```

2. **Configure Environment**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

### Backend (Render):

Follow Render steps above, but only deploy backend.

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `5000` |
| `CORS_ORIGIN` | Allowed frontend origin | `https://your-app.onrender.com` |

---

## Testing Deployment

### 1. Health Check
```bash
curl https://your-app.onrender.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-05T..."
}
```

### 2. Create Session
```bash
curl -X POST https://your-app.onrender.com/api/session
```

Expected response:
```json
{
  "sessionId": "uuid-here",
  "url": "https://your-app.onrender.com/session/uuid-here"
}
```

### 3. Full Test
1. Visit your deployment URL
2. Click "Create New Session"
3. Copy session link
4. Open in new incognito window
5. Edit code in both windows
6. Verify real-time synchronization
7. Test code execution (JavaScript and Python)

---

## Monitoring

### Render Dashboard:
- **Logs**: View real-time logs
- **Metrics**: CPU, memory usage
- **Events**: Deploy history

### Health Endpoint:
- Monitor via: `GET /health`
- Returns server status and timestamp

---

## Troubleshooting

### Issue: Service won't start

**Check logs for:**
- Port binding errors
- Missing dependencies
- Build failures

**Solution:**
```bash
# Rebuild from scratch
docker build --no-cache -t coding-interview-platform .
```

### Issue: WebSocket connection fails

**Check:**
- CORS configuration
- WebSocket protocol (ws:// vs wss://)
- Firewall settings

**Solution:**
Update CORS_ORIGIN to match your deployment URL

### Issue: Cold start takes too long

**Render free tier limitation:**
- First request after 15min inactivity takes ~30s
- Upgrade to paid plan for always-on service

---

## Scaling Considerations

### Current Setup (In-Memory Sessions):
- ✅ Fast for single instance
- ❌ Sessions lost on restart
- ❌ Won't work with multiple instances

### Production Recommendations:

1. **Use Redis for session storage**
   ```javascript
   // Replace Map with Redis
   import { createClient } from 'redis';
   const redis = createClient({ url: process.env.REDIS_URL });
   ```

2. **Enable sticky sessions** for WebSocket
   - Ensure same server handles reconnections

3. **Add database** for persistence
   - MongoDB, PostgreSQL, etc.
   - Store session history

4. **Configure CDN** for static assets
   - CloudFlare, CloudFront

5. **Add monitoring**
   - Sentry for error tracking
   - DataDog/New Relic for performance

---

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Render

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Trigger Render Deploy
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

Set `RENDER_DEPLOY_HOOK` in GitHub Secrets.

---

## Security Checklist

Before going live:

- [ ] Set strong CORS policies
- [ ] Add rate limiting (express-rate-limit)
- [ ] Sanitize user inputs
- [ ] Enable HTTPS only
- [ ] Set secure headers (helmet.js)
- [ ] Add session timeouts
- [ ] Implement authentication (if needed)
- [ ] Review code execution sandboxing

---

## Next Steps After Deployment

1. ✅ **Verify deployment** - Test all features
2. 📹 **Record demo video** - Show platform in action
3. 📱 **Share on social media** - LinkedIn, Twitter/X
4. 📊 **Monitor usage** - Check logs and metrics
5. 🔄 **Iterate** - Based on feedback

---

**Deployment Complete!** 🚀

Your coding interview platform is now live and accessible worldwide.
