# Vercel Deployment Guide with MongoDB Atlas

## Overview

This app uses **MongoDB Atlas** (free cloud database) for persistent content storage on Vercel. Admin panel edits are saved permanently in MongoDB, solving Vercel's serverless file system limitation.

## Prerequisites

Before deploying to Vercel, you need to:

1. Create a free MongoDB Atlas account
2. Get your MongoDB connection string
3. Configure Vercel environment variables

---

## Step 1: Set Up MongoDB Atlas (Free)

### 1.1 Create MongoDB Atlas Account

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with email or Google account
4. Choose **FREE** M0 cluster (512 MB storage, perfect for this use case)

### 1.2 Create a Cluster

1. After signing up, click "Build a Database"
2. Select **M0 FREE** tier
3. Choose a cloud provider (AWS recommended) and region close to your users
4. Click "Create Cluster" (takes 1-3 minutes)

### 1.3 Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username: `prudential_admin`
5. Click "Autogenerate Secure Password" and **SAVE IT**
6. Set user privileges to "Read and write to any database"
7. Click "Add User"

### 1.4 Allow Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for Vercel compatibility)
4. Click "Confirm"

### 1.5 Get Connection String

1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Drivers"
4. Select "Node.js" and latest version
5. Copy the connection string (looks like):
   ```
   mongodb+srv://prudential_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with the password you saved earlier
7. Add database name after `.net/`: `prudentialfinancial`

**Final connection string should look like:**
```
mongodb+srv://prudential_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/prudentialfinancial?retryWrites=true&w=majority
```

---

## Step 2: Migrate Content to MongoDB

Before deploying, populate your MongoDB database with existing content:

### 2.1 Set Local Environment Variable

Create a `.env` file in the project root:

```bash
MONGODB_URI=mongodb+srv://prudential_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/prudentialfinancial?retryWrites=true&w=majority
ADMIN_TOKEN=admin-secret-token-12345
```

### 2.2 Run Migration Script

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
✅ Migration completed successfully!
```

### 2.3 Test Locally (Optional)

```bash
npm run dev
```

Visit http://localhost:5173 and http://localhost:5173/admin to verify everything works with MongoDB.

---

## Step 3: Deploy to Vercel

### 3.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository: `prudentialfinancialau-lab/prudentialfinancialau`

### 3.2 Configure Project Settings

Vercel will detect the configuration automatically from `vercel.json`, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3.3 Set Environment Variables

In Vercel project settings → Environment Variables, add:

```
MONGODB_URI=mongodb+srv://prudential_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/prudentialfinancial?retryWrites=true&w=majority

ADMIN_TOKEN=your-secure-secret-token-here
```

**Important Security Notes:**
- Change `ADMIN_TOKEN` from default to a strong random token
- Never commit `.env` file to GitHub
- Keep your MongoDB password secure

### 3.4 Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Build the React app
3. Deploy the Express serverless API
4. Connect to MongoDB Atlas
5. Make it live at your Vercel URL

---

## How It Works on Vercel

### Architecture

- **Frontend**: Static React app served from `/dist` directory
- **API Routes**: `/api/*` → Handled by `server/index.js` serverless function
- **Database**: MongoDB Atlas (persistent cloud storage)
- **Admin Panel**: Accessible at `/admin` with token authentication

### Data Flow

1. User visits website → React app loads from Vercel CDN
2. Page loads → Fetch content from `/api/content/home` (serverless function)
3. Serverless function → Queries MongoDB Atlas
4. MongoDB → Returns page content
5. Admin edits → POST to `/api/content/:page` with auth token
6. Serverless function → Updates MongoDB Atlas
7. **Content persists permanently** in MongoDB

---

## Post-Deployment

Once deployed, you'll get a URL like: `https://your-project.vercel.app`

### Access Points

- **Website**: `https://your-project.vercel.app`
- **Home Page**: `https://your-project.vercel.app`
- **About Page**: `https://your-project.vercel.app/about`
- **Lenders Page**: `https://your-project.vercel.app/lenders`
- **Contact Page**: `https://your-project.vercel.app/contact`
- **Admin Panel**: `https://your-project.vercel.app/admin`
- **API Health**: `https://your-project.vercel.app/api/health`

### Using the Admin Panel

1. Go to `/admin`
2. Enter your `ADMIN_TOKEN` value
3. Select a page to edit
4. Make changes (text, images, etc.)
5. Click "Save Changes"
6. **Changes are saved permanently in MongoDB**
7. Refresh your public pages to see updates immediately

---

## Custom Domain

### Add Your Domain

1. Go to Project Settings → Domains in Vercel
2. Click "Add Domain"
3. Enter your domain: `prudentialfinancial.au`
4. Follow DNS instructions to add records
5. Your site will be live on your domain!

---

## Monitoring & Maintenance

### Check MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. View "Metrics" to see:
   - Database connections
   - Data size
   - Number of operations
3. Free tier includes 512 MB storage (plenty for content)

### Vercel Logs

1. Go to your Vercel project dashboard
2. Click "Functions" tab
3. View logs for API requests and errors
4. Monitor admin panel usage

### Security Best Practices

- **Rotate ADMIN_TOKEN** periodically
- **Use strong passwords** for MongoDB
- **Monitor access logs** in Vercel
- **Keep dependencies updated**: `npm audit fix`

---

## Troubleshooting

### Build Fails

**Issue**: Vercel build error

**Solutions**:
- Check Vercel build logs for specific errors
- Verify all dependencies are in `package.json`
- Test locally: `npm run vercel-build`
- Ensure MongoDB connection string is valid

### API Not Working

**Issue**: 500 errors on `/api/content/:page`

**Solutions**:
- Check MONGODB_URI environment variable is set in Vercel
- Verify MongoDB cluster is active (check Atlas dashboard)
- Check Vercel Function logs for error messages
- Test connection string format is correct

### Admin Panel Can't Save

**Issue**: Save button doesn't persist changes

**Solutions**:
- Verify ADMIN_TOKEN matches between admin panel and Vercel env var
- Check MongoDB Atlas → Network Access allows all IPs
- Confirm database user has "readWrite" permissions
- Check browser console for error messages

### Database Connection Error

**Issue**: `MongoServerSelectionError` in logs

**Solutions**:
- Verify MONGODB_URI is correct (copy from Atlas again)
- Check MongoDB cluster is running (not paused)
- Ensure Network Access allows `0.0.0.0/0` (all IPs)
- Wait 2-3 minutes for cluster to fully start

### Content Not Showing

**Issue**: Pages are blank or show errors

**Solutions**:
- Run migration script again: `node server/migrate.js`
- Check MongoDB Atlas → Browse Collections → verify `pages` collection has 4 documents
- Check Vercel Function logs for API errors
- Verify environment variables are set correctly

---

## Costs

### Free Tier Limits

**MongoDB Atlas M0 (FREE)**:
- 512 MB storage (plenty for content)
- Shared RAM
- Shared vCPU
- Perfect for small-to-medium websites

**Vercel Hobby (FREE)**:
- 100 GB bandwidth per month
- Unlimited websites
- Serverless Functions
- Automatic SSL

### When to Upgrade

Only upgrade if you exceed:
- MongoDB: 512 MB database size
- Vercel: 100 GB bandwidth per month

For a mortgage broker website with text/image content, the free tiers will work indefinitely.

---

## Summary

✅ **MongoDB Atlas** stores all content permanently
✅ **Vercel** hosts your website and API for free
✅ **Admin panel** edits persist across deployments
✅ **No file system issues** - everything in database
✅ **Works perfectly** with Vercel's serverless architecture

Your admin changes are now truly persistent on Vercel!
