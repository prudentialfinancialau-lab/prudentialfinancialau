# Custom Admin Panel - Documentation

## Overview

This project now uses a **custom-built admin panel** instead of TinaCMS. All content is stored in JSON files and can be edited through a clean, simple admin interface at `/admin`.

## Quick Start

### Development Mode

```bash
npm run dev
```

This starts the development server on **http://localhost:5173**

- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin

### Production Build

```bash
npm run build
npm run preview
```

## Admin Panel Features

### Access the Admin Panel

1. Navigate to `http://localhost:5173/admin`
2. Enter the auth token (default: `admin-secret-token-12345`)
3. Select a page from the sidebar (Home, About, Lenders, Contact)
4. Edit the content using the form fields
5. Click "Save Changes" to update the JSON files

### Page Structure

Each page has **independent** sections - you only see fields relevant to that page:

- **Home Page**: 9 sections (Hero, About, Help, Calculator, Lenders, Contact, Newsletter, Header, Footer)
- **About Page**: 4 sections (About, Help, Header, Footer)
- **Lenders Page**: 4 sections (Lenders, Calculator, Header, Footer)
- **Contact Page**: 3 sections (Contact, Header, Footer)

## Content Files Location

All content is stored in separate JSON files:

```
content/
├── home/index.json      # Home page content
├── about/index.json     # About page content
├── lenders/index.json   # Lenders page content
└── contact/index.json   # Contact page content
```

You can edit these files directly if needed, or use the admin panel.

## API Endpoints

The backend provides these REST API endpoints:

- `GET /api/content/:page` - Get content for a page (home, about, lenders, contact)
- `PUT /api/content/:page` - Update content for a page (requires auth token)
- `GET /api/pages` - List all available pages
- `GET /api/health` - Health check

## Authentication

### Change the Auth Token

Set the `ADMIN_TOKEN` environment variable:

```bash
ADMIN_TOKEN=your-secret-token npm run dev
```

Or update it in the server files:
- Development: `server/dev.js` (line 8)
- Production: `server/index.js` (line 11)

### How Authentication Works

1. When you login to `/admin`, the token is stored in localStorage
2. All save operations send the token in the `Authorization` header
3. The server validates the token before allowing updates

## Architecture

### Single Port Setup

Everything runs on **one port (5173)** during development:

- **Express server** handles API requests at `/api/*`
- **Vite middleware** serves the React app and handles hot module reload
- No CORS issues, no multiple ports to manage

### Technology Stack

- **Frontend**: React + React Router + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Dev Server**: Vite (integrated with Express)
- **Content Storage**: JSON files

## Deployment

### Option 1: Build and Serve Static Files

```bash
npm run build
```

This creates a `dist/` folder with static files. You'll need to:

1. Serve the static files
2. Run the API server separately (use `server/index.js` in production mode)
3. Set `VITE_API_URL` environment variable to your API server URL

### Option 2: Use PM2 (Recommended)

```bash
# Build the frontend
npm run build

# Start the server with PM2
pm2 start server/index.js --name "loan-admin-api"

# Or use PM2 ecosystem file
pm2 start ecosystem.config.js
```

### Environment Variables

For production, set these variables:

```bash
ADMIN_TOKEN=your-production-secret    # Required
PORT=5173                             # Optional (default: 5173)
NODE_ENV=production                   # Optional
```

## Advantages Over TinaCMS

✅ **No Cloud Dependencies** - Everything runs locally
✅ **No Schema Sync Issues** - Direct JSON file editing
✅ **Simple & Fast** - No GraphQL complexity
✅ **Full Control** - Easy to customize and extend
✅ **Independent Forms** - Each page shows only its own fields
✅ **Single Port** - No CORS, easier deployment
✅ **Lightweight** - Removed 810 packages, kept only essentials

## Troubleshooting

### API not responding

Check if the server is running:
```bash
curl http://localhost:5173/api/health
```

### Can't save changes

1. Check that you're logged in with the correct token
2. Verify the auth token matches the one in `server/dev.js`
3. Check server logs for error messages

### Pages not loading

1. Make sure JSON files exist in `content/` directories
2. Check browser console for errors
3. Verify the API endpoints are accessible

## Future Enhancements

Possible improvements you can add:

- Image upload functionality
- User management (multiple admin users)
- Change history/versioning
- Preview before save
- Bulk operations
- Better validation

## Support

For issues or questions, refer to the code in:
- `server/dev.js` - Development server
- `src/pages/AdminPage.jsx` - Admin UI
- `src/pages/*Page.jsx` - Frontend pages
