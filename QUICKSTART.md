# Quick Start Guide - Solar Cell CMS Backend

This guide will help you get the backend up and running quickly.

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js 18+ installed
- ✅ MongoDB installed locally OR MongoDB Atlas account
- ✅ npm or yarn package manager

## Step-by-Step Setup

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages including Payload CMS, Express, and MongoDB drivers.

### Step 2: Set Up MongoDB

#### Option A: Local MongoDB

If you have MongoDB installed locally:

```bash
# Start MongoDB service
mongod
```

MongoDB will run on `mongodb://localhost:27017` by default.

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### Step 3: Configure Environment Variables

The `.env` file is already created with default values. Update it if needed:

```bash
# Edit .env file
DATABASE_URI=mongodb://localhost:27017/solar-cell-cms  # Or your MongoDB Atlas URI
PAYLOAD_SECRET=your-secret-key-here-change-in-production  # Change this!
PORT=3001
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

**Important**: Change `PAYLOAD_SECRET` to a strong random string, especially for production!

### Step 4: Start the Development Server

```bash
npm run dev
```

You should see:
```
Server is running on http://localhost:3001
Admin panel: http://localhost:3001/admin
Payload Admin URL: http://localhost:3001/admin
```

### Step 5: Create Your First Admin User

1. Open your browser and go to: `http://localhost:3001/admin`
2. You'll see the "Create First User" screen
3. Fill in:
   - Email: your email address
   - Password: a strong password
   - Confirm Password: same password
4. Click "Create"

🎉 **Success!** You now have access to the Payload CMS admin panel.

## Verify Everything Works

### Check the Admin Panel

Navigate to `http://localhost:3001/admin` and you should see:
- Dashboard
- Users collection (with your admin user)

### Check the API

Open a new terminal and test the health endpoint:

```bash
curl http://localhost:3001/health
```

You should get:
```json
{"status":"ok","message":"Server is running"}
```

### Check CORS

The backend is configured to accept requests from `http://localhost:3000` (the frontend).

## Common Issues and Solutions

### Issue: "Cannot connect to MongoDB"

**Solution**: 
- Ensure MongoDB is running (`mongod` command)
- Check your `DATABASE_URI` in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### Issue: "Port 3001 already in use"

**Solution**: 
- Change `PORT` in `.env` to another port (e.g., 3002)
- Or stop the process using port 3001

### Issue: "Module not found"

**Solution**: 
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### Issue: CORS errors from frontend

**Solution**: 
- Verify `FRONTEND_URL` in `.env` matches your frontend URL exactly
- Restart the backend server after changing `.env`

## Next Steps

Now that your backend is running:

1. ✅ Backend server is running
2. ✅ Admin panel is accessible
3. ✅ First admin user created
4. ⏳ Add collections (Articles, Services, Reviews, Leads, Media) - Task 2.x
5. ⏳ Connect frontend to backend
6. ⏳ Test API endpoints

## Useful Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Run production build
npm run serve

# Generate TypeScript types from Payload config
npm run generate:types

# Run linter
npm run lint
```

## Admin Panel Features

Once logged in, you can:
- View and manage users
- Access collections (once added)
- Configure settings
- View API documentation

## API Documentation

The Payload CMS automatically generates API endpoints for all collections. Once collections are added, you can access:

- REST API: `http://localhost:3001/api/{collection-name}`
- GraphQL: `http://localhost:3001/api/graphql` (if enabled)

## Development Tips

1. **Hot Reload**: The dev server automatically restarts when you change files
2. **Type Safety**: Run `npm run generate:types` after modifying collections
3. **Logging**: Check the terminal for server logs and errors
4. **Admin Panel**: Use the admin panel to test CRUD operations

## Getting Help

If you encounter issues:
1. Check the terminal for error messages
2. Review the [Payload CMS Documentation](https://payloadcms.com/docs)
3. Check MongoDB connection and logs
4. Verify environment variables are set correctly

## Ready for Task 2!

Your backend is now ready for Task 2: Creating Payload CMS Collections (Articles, Services, Reviews, Leads, Media).
