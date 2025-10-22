# Prudential Financial Australia - Website with Custom Admin

A modern mortgage broker website built with React + Vite, featuring a custom admin panel for content management and MongoDB for persistent storage on Vercel.

## Features

- **4 Separate Pages**: Home, About, Lenders, Contact
- **Custom Admin Panel**: Edit all content through `/admin` interface
- **Persistent Storage**: MongoDB Atlas for permanent content saves
- **Vercel Ready**: Fully configured for serverless deployment
- **Token Authentication**: Secure admin access
- **Image & Text Editing**: Full content management capabilities

## Tech Stack

- **Frontend**: React 19, React Router v7, Tailwind CSS
- **Build Tool**: Vite
- **Backend**: Express.js (serverless functions on Vercel)
- **Database**: MongoDB Atlas (free tier)
- **Deployment**: Vercel
- **Authentication**: Token-based admin access

## Quick Start

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Access the app**
   - Website: http://localhost:5173
   - Admin Panel: http://localhost:5173/admin
   - Default Token: `admin-secret-token-12345`

### Production Build

```bash
npm run build
npm run start
```

## Deployment to Vercel

### Prerequisites

You need a **free MongoDB Atlas account** for persistent content storage.

### Step 1: Set Up MongoDB Atlas

Follow the detailed guide in **[MONGODB_SETUP.md](./MONGODB_SETUP.md)**

Quick summary:
1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create M0 FREE cluster (512 MB)
3. Get connection string
4. Run migration: `node server/migrate.js`

### Step 2: Deploy to Vercel

Follow the full guide in **[DEPLOYMENT.md](./DEPLOYMENT.md)**

Quick summary:
1. Connect GitHub repo to Vercel
2. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `ADMIN_TOKEN`: Your secure admin token
3. Deploy

## Project Structure

```
tinacms-app/
├── src/
│   ├── pages/           # React pages (Home, About, Lenders, Contact, Admin)
│   ├── components/      # Reusable UI components
│   ├── App.jsx          # Main app component with routing
│   └── main.jsx         # Entry point
├── server/
│   ├── index.js         # Production server (Vercel)
│   ├── dev.js           # Development server (local)
│   ├── db.js            # MongoDB connection & operations
│   └── migrate.js       # Content migration script
├── content/             # JSON content files (migrated to MongoDB)
│   ├── home/
│   ├── about/
│   ├── lenders/
│   └── contact/
├── vercel.json          # Vercel deployment config
├── DEPLOYMENT.md        # Full deployment guide
└── MONGODB_SETUP.md     # MongoDB setup guide
```

## Admin Panel

Access the admin panel at `/admin` to edit:

- **Home Page**: Hero, About, Help, Calculator, Lenders, Contact, Newsletter sections
- **About Page**: About and Help sections
- **Lenders Page**: Lenders and Calculator sections
- **Contact Page**: Contact section
- **Global**: Header and Footer (on all pages)

### Admin Features

- Select page to edit from dropdown
- Edit text content in real-time
- Update image URLs
- Save changes with authentication
- Changes persist permanently in MongoDB

## Environment Variables

Create a `.env` file for local development:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
ADMIN_TOKEN=your-secure-token-here
```

For Vercel, add these in project settings → Environment Variables.

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/pages` - List all pages
- `GET /api/content/:page` - Get page content (public)
- `PUT /api/content/:page` - Update page content (requires auth token)

## Security

- Admin panel protected by token authentication
- MongoDB credentials stored as environment variables
- HTTPS enforced on Vercel
- Network access configured in MongoDB Atlas

## Why MongoDB?

Vercel's serverless platform has an **ephemeral file system** - any file writes are lost between requests. To solve this:

- ✅ **With MongoDB**: Admin edits persist permanently in cloud database
- ❌ **Without MongoDB**: Admin edits would be lost on every request

MongoDB Atlas M0 (FREE tier) provides:
- 512 MB storage (plenty for content)
- Cloud-hosted (no server management)
- Works perfectly with Vercel serverless functions

## Documentation

- **[MONGODB_SETUP.md](./MONGODB_SETUP.md)** - Quick MongoDB Atlas setup guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete Vercel deployment guide
- **[ADMIN_README.md](./ADMIN_README.md)** - Admin panel user guide
- **[NEXTJS_ALTERNATIVES.md](./NEXTJS_ALTERNATIVES.md)** - Alternative CMS options

## Scripts

```bash
npm run dev          # Start development server (port 5173)
npm run build        # Build for production
npm run vercel-build # Build for Vercel deployment
npm run start        # Start production server
npm run preview      # Build and preview production
```

## Migration from TinaCMS

This project originally used TinaCMS but was migrated to a custom admin panel due to:
- TinaCMS Cloud schema indexing issues
- Need for more control over the admin interface
- Simpler deployment without cloud dependencies
- Cost savings (TinaCMS Cloud vs free MongoDB Atlas)

## Support

For issues or questions:
1. Check the deployment guides
2. Review Vercel Function logs
3. Check MongoDB Atlas metrics
4. Review browser console for frontend errors

## License

Private project for Prudential Financial Australia.
