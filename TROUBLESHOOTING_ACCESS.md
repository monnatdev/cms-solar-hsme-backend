# Troubleshooting Access Control Issue

## Problem
Getting "You are not allowed to perform this action" when trying to create content in Payload CMS.

## Quick Fix

### Option 1: Restart the Backend Server

The most common cause is that the server needs to be restarted after creating your first user.

1. Stop the backend server (Ctrl+C in the terminal)
2. Start it again:
   ```bash
   cd backend
   npm run dev
   ```
3. Refresh the admin panel in your browser
4. Try creating content again

### Option 2: Clear Browser Cache and Re-login

1. Log out of the admin panel
2. Clear your browser cache (or open an incognito window)
3. Go to http://localhost:3001/admin
4. Log in again
5. Try creating content

### Option 3: Verify User Authentication

1. Open browser DevTools (F12)
2. Go to the Console tab
3. Look for any error messages
4. Check the Network tab when trying to create content
5. Look for 401 or 403 errors

### Option 4: Check Backend Logs

Look at your backend terminal for any error messages. You should see:
```
isAdmin check - User: authenticated
```

If you see "not authenticated", there's a session issue.

### Option 5: Recreate Admin User

If nothing else works, you may need to recreate your admin user:

1. Stop the backend server
2. Connect to MongoDB and drop the users collection:
   ```bash
   mongosh
   use solar-cell-cms
   db.users.drop()
   exit
   ```
3. Start the backend server again
4. Go to http://localhost:3001/admin
5. Create a new admin user
6. Try creating content

## Verification Steps

After applying a fix, verify it works:

1. Go to http://localhost:3001/admin
2. Click on "Services" → "Create New"
3. Fill in the required fields:
   - Title: "Test Service"
   - Header: "Test Header"
   - Description: "Test description"
   - Status: "published"
4. Click "Create"

If it works, you should see "Successfully created Service" message.

## Common Causes

1. **Server not restarted**: After creating first user, server needs restart
2. **Session expired**: Browser session expired, need to re-login
3. **CORS issue**: Frontend URL doesn't match CORS configuration
4. **Database connection**: MongoDB connection issue
5. **Code changes**: Access control code was modified and server wasn't restarted

## Still Not Working?

If none of the above works, let's temporarily disable access control for testing:

1. Edit `backend/src/collections/Articles.ts` (and other collections)
2. Change the access control to:
   ```typescript
   access: {
     read: () => true,
     create: () => true,
     update: () => true,
     delete: () => true,
   },
   ```
3. Restart the backend server
4. Try creating content

**Important**: This makes everything public! Only use for local testing, never in production.

## Need More Help?

Check the backend terminal logs for specific error messages and share them for more targeted help.
