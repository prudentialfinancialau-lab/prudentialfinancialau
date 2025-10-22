import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5173;
const AUTH_TOKEN = process.env.ADMIN_TOKEN || 'admin-secret-token-12345';

async function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Simple authentication middleware
  const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token === AUTH_TOKEN) {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

  // API Routes
  // Get content for a specific page
  app.get('/api/content/:page', async (req, res) => {
    try {
      const { page } = req.params;
      const validPages = ['home', 'about', 'lenders', 'contact'];

      if (!validPages.includes(page)) {
        return res.status(404).json({ error: 'Page not found' });
      }

      const contentPath = path.join(__dirname, '../content', page, 'index.json');
      const content = await fs.readFile(contentPath, 'utf-8');
      res.json(JSON.parse(content));
    } catch (error) {
      res.status(500).json({ error: 'Failed to read content', message: error.message });
    }
  });

  // Update content for a specific page (protected)
  app.put('/api/content/:page', authenticate, async (req, res) => {
    try {
      const { page } = req.params;
      const validPages = ['home', 'about', 'lenders', 'contact'];

      if (!validPages.includes(page)) {
        return res.status(404).json({ error: 'Page not found' });
      }

      const contentPath = path.join(__dirname, '../content', page, 'index.json');

      // Write the new content
      await fs.writeFile(
        contentPath,
        JSON.stringify(req.body, null, 2),
        'utf-8'
      );

      res.json({ success: true, message: 'Content updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update content', message: error.message });
    }
  });

  // Get list of all pages
  app.get('/api/pages', async (req, res) => {
    res.json({
      pages: [
        { id: 'home', name: 'Home Page', sections: ['hero', 'about', 'help', 'calculator', 'lenders', 'contact', 'newsletter', 'header', 'footer'] },
        { id: 'about', name: 'About Page', sections: ['about', 'help', 'header', 'footer'] },
        { id: 'lenders', name: 'Lenders Page', sections: ['lenders', 'calculator', 'header', 'footer'] },
        { id: 'contact', name: 'Contact Page', sections: ['contact', 'header', 'footer'] }
      ]
    });
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.listen(PORT, () => {
    console.log(`\n🚀 Development server running on http://localhost:${PORT}`);
    console.log(`📝 Admin panel: http://localhost:${PORT}/admin`);
    console.log(`🔑 Auth token: ${AUTH_TOKEN}\n`);
  });
}

createServer();
