# Vercel Deployment Guide

## Automatic Deployment from GitHub

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your repository: `prudentialfinancialau-lab/prudentialfinancialau`

### Step 2: Configure Project Settings

Vercel will detect the configuration automatically from `vercel.json`, but verify:

- **Framework Preset**: Vite
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Set Environment Variables

In Vercel project settings, add:

```
ADMIN_TOKEN=your-secret-token-here
```

**Important**: Change from the default `admin-secret-token-12345` to a secure token!

### Step 4: Deploy

Click "Deploy" and Vercel will:
1. Install dependencies
2. Build the React app (`npm run vercel-build`)
3. Deploy the Express server (`server/index.js`)
4. Make it live at your Vercel URL

## How It Works on Vercel

- **API Routes**: `/api/*` → Handled by `server/index.js` serverless function
- **Static Files**: All other routes → Served from `dist/` directory
- **Admin Panel**: Accessible at `your-domain.vercel.app/admin`

## Post-Deployment

Once deployed, you'll get a URL like: `https://your-project.vercel.app`

Access:
- **Website**: `https://your-project.vercel.app`
- **Admin**: `https://your-project.vercel.app/admin`
- **API Health**: `https://your-project.vercel.app/api/health`

## Important Notes

### Content Updates

⚠️ **Warning**: On Vercel's serverless platform, file system writes are NOT persistent between requests. This means:

- Admin panel content updates **will be lost** on each new deployment
- For persistent content, you have two options:

**Option 1: Commit to GitHub (Recommended)**
- Edit JSON files locally in `content/` directories
- Commit and push to GitHub
- Vercel auto-deploys with new content

**Option 2: Use a Database**
- Replace file system storage with a database (MongoDB, PostgreSQL, etc.)
- Modify `server/index.js` to read/write from database instead of files

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Your site will be live on your domain!

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify `npm run vercel-build` works locally

### API Not Working
- Check environment variables are set
- Verify API routes in Vercel Function logs
- Test API health endpoint: `/api/health`

### Admin Can't Save
- Remember: File writes aren't persistent on Vercel
- Edit JSON files locally and redeploy
- Or implement database storage

## Alternative: Railway Deployment

If you need persistent file writes, use Railway.app instead:

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Deploy with build command: `npm run build`
4. Start command: `npm run start`
5. Add environment variable: `ADMIN_TOKEN`

Railway provides persistent storage, so admin edits will be saved!
