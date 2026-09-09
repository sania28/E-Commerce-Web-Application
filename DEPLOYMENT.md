# 🚀 Deployment Guide

Complete guide for deploying ShopMart E-Commerce to production.

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Environment variables configured
- [ ] Database backup created
- [ ] Security review completed
- [ ] Performance optimization done
- [ ] Error handling implemented
- [ ] HTTPS enabled
- [ ] CORS configured properly

---

## 🗄️ Database Deployment (MongoDB Atlas)

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (Free tier available)

### 2. Configure Database

1. Create a database user with password
2. Whitelist IP addresses (0.0.0.0/0 for all - **not recommended for production**)
3. Get connection string:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
```

### 3. Migrate Data (Optional)

```bash
# Export from local
mongodump --uri="mongodb://localhost:27017/ecommerce" --out=./backup

# Import to Atlas
mongorestore --uri="<your-atlas-connection-string>" ./backup/ecommerce
```

---

## 🖥️ Backend Deployment

### Option 1: Railway

1. **Create Account**

   - Go to [Railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy from GitHub**

   ```bash
   # Push your code to GitHub first
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Create New Project**

   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

4. **Configure Environment Variables**

   - Go to Variables tab
   - Add:
     ```
     NODE_ENV=production
     MONGODB_URI=<your-atlas-uri>
     JWT_SECRET=<generate-strong-secret>
     CLIENT_URL=<your-frontend-url>
     PORT=5000
     ```

5. **Configure Build**

   - Root directory: `/`
   - Build command: `npm install`
   - Start command: `node server/index.js`

6. **Deploy**
   - Railway will auto-deploy
   - Get your backend URL: `https://your-app.railway.app`

### Option 2: Render

1. **Create Account**

   - Go to [Render.com](https://render.com)
   - Sign up

2. **Create Web Service**

   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repository

3. **Configure Service**

   - Name: `ShopMart-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server/index.js`

4. **Environment Variables**
   Same as Railway (see above)

5. **Deploy**
   - Click "Create Web Service"
   - Get URL: `https://your-app.onrender.com`

### Option 3: Heroku

```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create ShopMart-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=<your-atlas-uri>
heroku config:set JWT_SECRET=<strong-secret>
heroku config:set CLIENT_URL=<frontend-url>

# Deploy
git push heroku main

# Open app
heroku open
```

---

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Build Frontend**

   ```bash
   cd client
   npm run build
   ```

3. **Deploy**

   ```bash
   vercel
   ```

4. **Configure Environment**

   - Create `vercel.json` in client folder:

   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/" }]
   }
   ```

5. **Update API URL**

   - In `client/src/services/api.js`, update baseURL:

   ```javascript
   const api = axios.create({
     baseURL: "https://your-backend.railway.app/api",
   });
   ```

6. **Redeploy**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Build Frontend**

   ```bash
   cd client
   npm run build
   ```

3. **Create `_redirects` file in `client/public`**

   ```
   /*    /index.html   200
   ```

4. **Deploy**
   ```bash
   cd client
   netlify deploy --prod --dir=dist
   ```

### Option 3: GitHub Pages (Static)

```bash
# Install gh-pages
cd client
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist",
"predeploy": "npm run build"

# Deploy
npm run deploy
```

---

## 🔧 Production Configuration

### 1. Update CORS in Backend

```javascript
// server/index.js
app.use(
  cors({
    origin: ["https://your-frontend.vercel.app", "https://www.yourdomain.com"],
    credentials: true,
  })
);
```

### 2. Generate Strong JWT Secret

```bash
# In PowerShell
$secret = -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
echo $secret
```

### 3. Enable HTTPS

- Vercel/Netlify: Automatic
- Custom domain: Use Cloudflare or Let's Encrypt

### 4. Set Secure Headers

```javascript
// server/index.js
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});
```

---

## 🔐 Security Checklist

- [ ] Strong JWT secret (64+ characters)
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] Rate limiting implemented (optional)
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] Sensitive data not logged
- [ ] Dependencies updated
- [ ] MongoDB Atlas IP whitelist configured

---

## 📊 Post-Deployment

### 1. Test All Features

- User registration/login
- Product browsing
- Cart functionality
- Checkout process
- Admin login
- Product CRUD
- Order management
- CSV export

### 2. Monitor Application

- Check logs regularly
- Monitor response times
- Track error rates
- Monitor database performance

### 3. Setup Backups

```bash
# Automated MongoDB Atlas backups
# Or use mongodump
mongodump --uri="<your-atlas-uri>" --out=./backup-$(date +%Y%m%d)
```

---

## 🌍 Custom Domain (Optional)

### Vercel

1. Go to Project Settings → Domains
2. Add your domain: `www.yourdomain.com`
3. Configure DNS (A record or CNAME)
4. SSL auto-configured

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS
4. SSL auto-configured

---

## 📱 Environment Variables Summary

### Backend (Railway/Render/Heroku)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
JWT_SECRET=<64-char-random-string>
CLIENT_URL=https://your-frontend.vercel.app
```

### Frontend (Build Time)

Update in `client/src/services/api.js`:

```javascript
baseURL: "https://your-backend.railway.app/api";
```

---

## 🐛 Troubleshooting

### Issue: CORS Error

**Solution:** Update `CLIENT_URL` and CORS origin in backend

### Issue: 404 on Frontend Routes

**Solution:** Add rewrite rules (see Frontend Deployment)

### Issue: MongoDB Connection Timeout

**Solution:** Check IP whitelist in MongoDB Atlas

### Issue: Build Failed

**Solution:** Check Node.js version compatibility

---

## 📈 Scaling Tips

1. **Enable CDN** for static assets
2. **Add Redis** for session management (optional)
3. **Implement caching** for frequently accessed data
4. **Use load balancer** for high traffic
5. **Optimize images** and use lazy loading
6. **Monitor performance** with tools like New Relic

---

## 🎯 Success!

Your application is now live! 🎉

**Demo URLs:**

- Frontend: https://your-app.vercel.app
- Backend: https://your-app.railway.app
- Admin Panel: https://your-app.vercel.app/admin/login

**Next Steps:**

1. Share demo credentials with evaluators
2. Create demo video
3. Document any known issues
4. Prepare for presentation

---

**Need Help?** Check logs on your deployment platform or review the troubleshooting section.
