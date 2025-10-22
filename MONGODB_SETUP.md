# Quick MongoDB Setup for Vercel

## Why MongoDB?

Your admin panel now uses **MongoDB Atlas** (free cloud database) so that content edits persist permanently on Vercel. Without this, Vercel's serverless platform would lose all admin changes.

## What You Need

1. **MongoDB Atlas account** (free, no credit card required)
2. **Connection string** to add to Vercel environment variables
3. **5 minutes** to set up

---

## Step-by-Step Setup

### 1. Create Free MongoDB Atlas Account

Go to: https://www.mongodb.com/cloud/atlas/register

- Sign up with email or Google
- Choose **FREE M0 cluster** (512 MB storage - perfect for this site)
- Select AWS and a region near your users
- Wait 1-3 minutes for cluster creation

### 2. Create Database User

In MongoDB Atlas dashboard:

1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Username: `prudential_admin`
4. Click "Autogenerate Secure Password" → **SAVE THIS PASSWORD**
5. User Privileges: "Read and write to any database"
6. Click "Add User"

### 3. Allow Network Access

1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (needed for Vercel)
4. Confirm

### 4. Get Connection String

1. Go to "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Drivers" → Node.js
4. Copy the connection string

It looks like:
```
mongodb+srv://prudential_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Replace** `<password>` with your saved password and add database name:
```
mongodb+srv://prudential_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/prudentialfinancial?retryWrites=true&w=majority
```

### 5. Migrate Your Content

Before deploying to Vercel, populate MongoDB with your existing content:

Create `.env` file in project root:
```bash
MONGODB_URI=mongodb+srv://prudential_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/prudentialfinancial?retryWrites=true&w=majority
ADMIN_TOKEN=admin-secret-token-12345
```

Run migration:
```bash
node server/migrate.js
```

You should see:
```
✅ Loaded home page content
✅ Loaded about page content
✅ Loaded lenders page content
✅ Loaded contact page content
✅ Initialized 4 pages in database
```

### 6. Deploy to Vercel

In Vercel project settings → Environment Variables:

Add these two variables:
```
MONGODB_URI=mongodb+srv://prudential_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/prudentialfinancial?retryWrites=true&w=majority

ADMIN_TOKEN=your-secure-secret-token
```

**Important:**
- Keep MongoDB password secure
- Change ADMIN_TOKEN from default to something strong
- Never commit `.env` to GitHub

Deploy and you're done!

---

## How It Works

**Before (File System - Doesn't Work on Vercel)**:
- Admin edits → Save to JSON files
- Vercel serverless → Files lost on next request
- ❌ Changes don't persist

**Now (MongoDB - Works on Vercel)**:
- Admin edits → Save to MongoDB Atlas
- Vercel serverless → Queries MongoDB
- ✅ Changes persist permanently

---

## Verify Setup

After deploying:

1. Visit your Vercel URL: `https://your-site.vercel.app`
2. Go to admin: `https://your-site.vercel.app/admin`
3. Login with your ADMIN_TOKEN
4. Edit some content and save
5. Refresh the public page → **Changes should be visible**
6. Check MongoDB Atlas → Database → Browse Collections → You should see your updates

---

## Costs

**100% FREE** for your use case:

- MongoDB Atlas M0: **FREE** (512 MB storage)
- Vercel Hobby: **FREE** (100 GB bandwidth/month)

Your mortgage broker site with text and images will never exceed these limits.

---

## Troubleshooting

**Can't connect to MongoDB:**
- Verify connection string is correct
- Check "Allow Access from Anywhere" in Network Access
- Wait 2-3 minutes for cluster to fully start

**Admin changes not saving:**
- Check MONGODB_URI is set in Vercel environment variables
- Verify database user has "readWrite" permissions
- Check browser console for errors

**Migration fails:**
- Make sure `.env` file exists with correct MONGODB_URI
- Run `node server/migrate.js` again after fixing connection string

---

## Next Steps

Read the full deployment guide: **DEPLOYMENT.md**

It covers:
- Custom domains
- Monitoring
- Security best practices
- Advanced troubleshooting
