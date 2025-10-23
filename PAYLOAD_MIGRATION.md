# Migration from TinaCMS to Payload CMS

This document outlines the migration process from TinaCMS to Payload CMS for the Prudential Financial loan website.

## What Changed

### Removed
- **TinaCMS** - The entire TinaCMS setup has been removed
- `/tina` directory - TinaCMS configuration and generated files
- `/public/admin` - TinaCMS admin interface
- TinaCMS-specific dependencies

### Added
- **Payload CMS v3** - Modern, self-hosted headless CMS
- `payload.config.js` - Payload configuration with all collections
- `server/payload-server.js` - Production server with Payload integration
- `server/payload-dev.js` - Development server with Vite + Payload
- `scripts/migrate-to-payload.js` - Data migration script
- Payload dependencies:
  - `payload@beta`
  - `@payloadcms/db-mongodb@beta`
  - `@payloadcms/richtext-lexical@beta`
  - `@payloadcms/next@beta`

## Collections Structure

Payload CMS uses the following collections:

1. **users** - Admin authentication
2. **home-page** - Home page content
3. **about-page** - About page content
4. **lenders-page** - Lenders page content
5. **contact-page** - Contact page content
6. **media** - File uploads and images

Each page collection includes all sections (hero, about, help, calculator, lenders, contact, newsletter, header, footer) as configured in the original TinaCMS setup.

## Migration Steps

### 1. Install Dependencies (Already Done)
```bash
npm install
```

### 2. Run Data Migration
This step migrates existing content from the old MongoDB structure to Payload collections:

```bash
npm run migrate
```

This script will:
- Connect to your existing MongoDB database
- Read all pages from the `pages` collection
- Create/update corresponding Payload CMS collections
- Preserve all existing content

### 3. Create Admin User
Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173/admin` and create your first admin user. This user will have full access to edit all content.

### 4. Verify Content
1. Log into the Payload admin panel at `/admin`
2. Check each page collection (Home Page, About Page, etc.)
3. Verify all content has been migrated correctly
4. Make any necessary adjustments

### 5. Test Frontend
1. Visit `http://localhost:5173` to view the frontend
2. Navigate through all pages (Home, About, Lenders, Contact)
3. Verify all content displays correctly
4. Test the mortgage calculator and contact forms

## API Endpoints

The API endpoints remain **backward compatible** with the existing frontend:

- `GET /api/content/:page` - Get page content (home, about, lenders, contact)
- `GET /api/pages` - Get list of all pages
- `GET /api/health` - Health check

The server automatically maps old page slugs to new Payload collections:
- `home` → `home-page`
- `about` → `about-page`
- `lenders` → `lenders-page`
- `contact` → `contact-page`

## Admin Panel Features

Payload CMS provides a powerful admin interface at `/admin`:

- **Authentication** - Secure user authentication with email/password
- **Rich Editor** - Lexical rich text editor for content
- **Media Management** - Upload and manage images
- **Access Control** - Fine-grained permissions (expandable)
- **API Access** - RESTful and GraphQL APIs
- **Custom Fields** - Extensible field types
- **Relationships** - Link content across collections

## Development

### Development Server
```bash
npm run dev
```
Starts both Vite dev server and Payload admin at `http://localhost:5173`

### Production Build
```bash
npm run build
```
Builds the frontend for production

### Production Server
```bash
npm run start
```
Serves the built frontend with Payload admin

### Generate TypeScript Types
```bash
npm run generate:types
```
Generates TypeScript types from Payload collections

## Environment Variables

Required environment variables in `.env`:

```env
MONGODB_URI=mongodb+srv://...
ADMIN_TOKEN=admin-secret-token-12345
PAYLOAD_SECRET=your-secret-key-change-this-in-production
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:5173
```

**Important**: Change `PAYLOAD_SECRET` to a secure random string in production!

## Benefits of Payload CMS

1. **Self-Hosted** - Full control over your CMS and data
2. **Type-Safe** - Auto-generated TypeScript types
3. **Modern UI** - Clean, intuitive admin interface
4. **Flexible** - Highly customizable and extensible
5. **API-First** - RESTful and GraphQL APIs out of the box
6. **Access Control** - Built-in authentication and permissions
7. **File Uploads** - Integrated media management
8. **No Vendor Lock-in** - Open source and self-hosted
9. **Better Performance** - Direct MongoDB integration
10. **Active Development** - Regular updates and improvements

## Troubleshooting

### Cannot connect to MongoDB
- Verify `MONGODB_URI` in `.env` is correct
- Check network connectivity to MongoDB
- Ensure MongoDB user has proper permissions

### Admin panel not loading
- Check that `PAYLOAD_SECRET` is set in `.env`
- Clear browser cache and cookies
- Check browser console for errors

### Content not displaying on frontend
- Verify migration script ran successfully
- Check API endpoints are returning data: `http://localhost:5173/api/content/home`
- Review browser console for errors

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Clear `node_modules` and reinstall if needed
- Check for TypeScript errors with `npm run generate:types`

## Future Enhancements

Possible improvements to consider:

1. **Custom Dashboard** - Create a custom Payload dashboard
2. **Versioning** - Enable content versioning and drafts
3. **Webhooks** - Add webhooks for deployment triggers
4. **Localization** - Multi-language support
5. **Advanced Access Control** - Role-based permissions
6. **Custom Fields** - Additional custom field types
7. **Analytics** - Content analytics and insights
8. **SEO Fields** - Meta tags and SEO optimization

## Support

For questions or issues:
- Payload CMS Documentation: https://payloadcms.com/docs
- Payload CMS Discord: https://discord.com/invite/payload
- GitHub Issues: https://github.com/payloadcms/payload

## Notes

- The frontend code remains **unchanged** - all React components work as before
- The migration preserves all existing content structure
- The old server files (`server/index.js`, `server/dev.js`, `server/db.js`) are kept for reference but no longer used
- Media files in `/public` are preserved and can be managed through Payload's media collection
