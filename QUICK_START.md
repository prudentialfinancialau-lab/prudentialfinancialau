# Quick Start Guide - Payload CMS

## Getting Started in 3 Steps

### Step 1: Run Data Migration
Migrate your existing content from the old TinaCMS MongoDB structure to Payload:

```bash
npm run migrate
```

This will transfer all your existing page content (home, about, lenders, contact) to the new Payload collections.

### Step 2: Start Development Server
```bash
npm run dev
```

The server will start at `http://localhost:5173`

### Step 3: Create Admin User
1. Open your browser to `http://localhost:5173/admin`
2. You'll see a "Create First User" screen
3. Enter your email and password
4. Click "Create"

That's it! You now have a working Payload CMS installation.

## What's Available

### Admin Panel
- URL: `http://localhost:5173/admin`
- Manage all page content
- Upload and manage images
- User authentication

### Frontend
- URL: `http://localhost:5173`
- All existing pages work as before
- Content is pulled from Payload CMS

### API Endpoints
- `GET /api/content/home` - Home page content
- `GET /api/content/about` - About page content
- `GET /api/content/lenders` - Lenders page content
- `GET /api/content/contact` - Contact page content
- `GET /api/pages` - List of all pages
- `GET /api/health` - Health check

## Editing Content

1. Log into admin panel: `http://localhost:5173/admin`
2. Click on "Pages" in the left sidebar
3. Select the page you want to edit (Home Page, About Page, etc.)
4. Make your changes
5. Click "Save"
6. Refresh the frontend to see your changes

## Production Deployment

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

### Environment Variables
Make sure these are set in your production environment:

```env
MONGODB_URI=your_production_mongodb_uri
PAYLOAD_SECRET=your_secure_random_string
PAYLOAD_PUBLIC_SERVER_URL=https://your-domain.com
ADMIN_TOKEN=your_admin_token
```

## Need Help?

See `PAYLOAD_MIGRATION.md` for detailed documentation.
