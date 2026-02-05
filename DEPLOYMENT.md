# Deployment Guide - Solar Cell CMS Backend

This guide covers deploying the Payload CMS backend to production.

## Deployment Options

The backend can be deployed to various platforms:

1. **Railway** (Recommended - Easy deployment)
2. **Heroku** (Popular PaaS)
3. **DigitalOcean App Platform**
4. **AWS EC2 / Elastic Beanstalk**
5. **Google Cloud Platform**
6. **Self-hosted VPS**

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All code is committed to Git
- [ ] Environment variables are documented
- [ ] MongoDB production database is set up (MongoDB Atlas recommended)
- [ ] Strong `PAYLOAD_SECRET` is generated
- [ ] CORS origins are configured for production frontend URL
- [ ] Build process works locally (`npm run build`)
- [ ] All tests pass

## Option 1: Deploy to Railway (Recommended)

Railway offers easy deployment with automatic HTTPS and environment management.

### Step 1: Prepare Your Repository

Ensure your code is in a Git repository (GitHub, GitLab, or Bitbucket).

### Step 2: Create Railway Account

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub

### Step 3: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your backend repository
4. Railway will detect it's a Node.js project

### Step 4: Configure Environment Variables

In Railway dashboard, add these environment variables:

```
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/solar-cell-cms
PAYLOAD_SECRET=<generate-strong-random-string>
PORT=3001
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
```

### Step 5: Configure Build Settings

Railway should auto-detect, but verify:
- **Build Command**: `npm run build`
- **Start Command**: `npm run serve`

### Step 6: Deploy

1. Click "Deploy"
2. Railway will build and deploy your app
3. You'll get a URL like: `https://your-app.railway.app`

### Step 7: Create Admin User

1. Visit `https://your-app.railway.app/admin`
2. Create your first admin user

## Option 2: Deploy to Heroku

### Step 1: Install Heroku CLI

```bash
npm install -g heroku
heroku login
```

### Step 2: Create Heroku App

```bash
cd backend
heroku create solar-cell-cms-backend
```

### Step 3: Set Environment Variables

```bash
heroku config:set DATABASE_URI="mongodb+srv://username:password@cluster.mongodb.net/solar-cell-cms"
heroku config:set PAYLOAD_SECRET="your-strong-secret"
heroku config:set FRONTEND_URL="https://your-frontend-domain.com"
heroku config:set NODE_ENV="production"
```

### Step 4: Add Procfile

Create `Procfile` in backend root:

```
web: npm run serve
```

### Step 5: Deploy

```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

### Step 6: Open App

```bash
heroku open
```

## MongoDB Atlas Setup (Required for Production)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier

### Step 2: Create Cluster

1. Click "Build a Cluster"
2. Choose "Shared" (Free tier)
3. Select region closest to your deployment
4. Click "Create Cluster"

### Step 3: Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and strong password
5. Set role to "Read and write to any database"

### Step 4: Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for cloud deployments
4. Or add specific IPs of your deployment platform

### Step 5: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `solar-cell-cms`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/solar-cell-cms?retryWrites=true&w=majority
```

## Environment Variables Reference

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `DATABASE_URI` | MongoDB connection string | `mongodb+srv://...` | Yes |
| `PAYLOAD_SECRET` | Secret key for JWT tokens | Random 32+ char string | Yes |
| `PORT` | Server port | `3001` | No (default: 3001) |
| `FRONTEND_URL` | Frontend URL for CORS | `https://example.com` | Yes |
| `NODE_ENV` | Node environment | `production` | Yes |

## Generating Strong PAYLOAD_SECRET

Use one of these methods:

### Method 1: Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Method 2: OpenSSL
```bash
openssl rand -hex 32
```

### Method 3: Online Generator
Use a password generator to create a 32+ character random string.

## Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` to Git
- ✅ Use strong, unique `PAYLOAD_SECRET`
- ✅ Rotate secrets periodically

### 2. MongoDB Security
- ✅ Use MongoDB Atlas with authentication
- ✅ Enable IP whitelisting
- ✅ Use strong database passwords
- ✅ Enable encryption at rest

### 3. CORS Configuration
- ✅ Only allow specific frontend origins
- ✅ Don't use wildcard (*) in production
- ✅ Use HTTPS for all origins

### 4. HTTPS/SSL
- ✅ Always use HTTPS in production
- ✅ Most platforms (Railway, Heroku) provide automatic SSL

### 5. Rate Limiting
Consider adding rate limiting for API endpoints:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Monitoring and Logging

### Application Monitoring

Consider using:
- **Sentry**: Error tracking
- **LogRocket**: Session replay
- **New Relic**: Performance monitoring

### Database Monitoring

MongoDB Atlas provides:
- Performance metrics
- Query analytics
- Alerts for issues

### Health Checks

The backend includes a health check endpoint:
```
GET /health
```

Set up monitoring to ping this endpoint regularly.

## Backup Strategy

### MongoDB Backups

MongoDB Atlas provides:
- Automatic daily backups (free tier)
- Point-in-time recovery (paid tiers)
- Manual backup snapshots

### Media Files Backup

If using local file storage, consider:
- Regular backups of `media/` directory
- Or use cloud storage (AWS S3, Cloudinary)

## Scaling Considerations

### Horizontal Scaling

For high traffic:
- Deploy multiple instances behind a load balancer
- Use MongoDB replica sets
- Use Redis for session storage

### Vertical Scaling

For moderate traffic:
- Increase server resources (RAM, CPU)
- Optimize MongoDB indexes
- Enable caching

## Troubleshooting Deployment Issues

### Build Fails

**Check**:
- Node.js version compatibility
- All dependencies in `package.json`
- TypeScript compilation errors

**Solution**:
```bash
npm run build
# Fix any errors shown
```

### Cannot Connect to MongoDB

**Check**:
- `DATABASE_URI` is correct
- MongoDB Atlas IP whitelist includes deployment platform
- Database user credentials are correct

### CORS Errors

**Check**:
- `FRONTEND_URL` matches actual frontend URL exactly
- No trailing slash in URL
- HTTPS vs HTTP

### 502 Bad Gateway

**Check**:
- Server is starting correctly
- Port configuration
- Check deployment logs

## Post-Deployment Tasks

After successful deployment:

1. ✅ Test admin panel access
2. ✅ Create admin user
3. ✅ Test API endpoints
4. ✅ Verify CORS with frontend
5. ✅ Set up monitoring
6. ✅ Configure backups
7. ✅ Document deployment URLs
8. ✅ Set up CI/CD (optional)

## Continuous Deployment (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
      # Add Railway deployment step
```

## Support and Resources

- [Railway Documentation](https://docs.railway.app/)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Payload CMS Deployment Guide](https://payloadcms.com/docs/production/deployment)

## Rollback Strategy

If deployment fails:

1. **Railway/Heroku**: Rollback to previous deployment in dashboard
2. **Git**: Revert to previous commit and redeploy
3. **Database**: Restore from MongoDB Atlas backup if needed

## Cost Estimates

### Free Tier (Development/Small Projects)
- MongoDB Atlas: Free (512MB storage)
- Railway: Free tier available
- Heroku: Free tier (with limitations)

### Production (Medium Traffic)
- MongoDB Atlas: $9-25/month
- Railway: $5-20/month
- Heroku: $7-25/month

### Enterprise (High Traffic)
- MongoDB Atlas: $57+/month
- Dedicated servers: $50-500+/month
- CDN and caching: Additional costs

## Next Steps

After deployment:
1. Connect frontend to production backend URL
2. Test all features in production
3. Set up monitoring and alerts
4. Configure automated backups
5. Document production URLs and credentials (securely)
