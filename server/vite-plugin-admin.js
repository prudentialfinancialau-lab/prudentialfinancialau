import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple admin credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files allowed!'));
  }
});

// Simple auth check
function checkAuth(req, res) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized' }));
    return false;
  }

  const token = auth.split(' ')[1];
  // Simple token format: base64(username:password)
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [username, password] = decoded.split(':');
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return true;
    }
  } catch (e) {
    // Invalid token
  }

  res.statusCode = 401;
  res.end(JSON.stringify({ error: 'Invalid credentials' }));
  return false;
}

export default function adminApiPlugin() {
  return {
    name: 'vite-plugin-admin-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url;

        // Add no-cache headers for content JSON files
        if (url.startsWith('/content/') && url.includes('.json')) {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }

        // Login endpoint
        if (url === '/api/admin/login' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const { username, password } = JSON.parse(body);
              if (username === ADMIN_USER && password === ADMIN_PASS) {
                const token = Buffer.from(`${username}:${password}`).toString('base64');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ token, message: 'Login successful' }));
              } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid credentials' }));
              }
            } catch (e) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid request' }));
            }
          });
          return;
        }

        // Get all content
        if (url === '/api/admin/content' && req.method === 'GET') {
          if (!checkAuth(req, res)) return;

          const contentDir = path.join(__dirname, '../content');
          const pages = ['home', 'about', 'services', 'contact'];
          const allContent = {};

          pages.forEach(page => {
            const filePath = path.join(contentDir, page, 'index.json');
            if (fs.existsSync(filePath)) {
              allContent[page] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            }
          });

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(allContent));
          return;
        }

        // Get specific page content
        if (url.startsWith('/api/admin/content/') && req.method === 'GET') {
          if (!checkAuth(req, res)) return;

          const page = url.split('/')[4];
          const filePath = path.join(__dirname, '../content', page, 'index.json');

          if (!fs.existsSync(filePath)) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Page not found' }));
            return;
          }

          const content = fs.readFileSync(filePath, 'utf8');
          res.setHeader('Content-Type', 'application/json');
          res.end(content);
          return;
        }

        // Update page content
        if (url.startsWith('/api/admin/content/') && req.method === 'PUT') {
          if (!checkAuth(req, res)) return;

          const page = url.split('/')[4];
          let body = '';

          req.on('data', chunk => body += chunk);
          req.on('end', () => {
            try {
              const newContent = JSON.parse(body);
              const filePath = path.join(__dirname, '../content', page, 'index.json');
              const dir = path.dirname(filePath);

              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }

              fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ message: 'Content updated', content: newContent }));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to update content' }));
            }
          });
          return;
        }

        // Get uploaded images
        if (url === '/api/admin/images' && req.method === 'GET') {
          if (!checkAuth(req, res)) return;

          const uploadsDir = path.join(__dirname, '../public/uploads');
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }

          const files = fs.readdirSync(uploadsDir);
          const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => {
              const stats = fs.statSync(path.join(uploadsDir, file));
              return {
                filename: file,
                url: `/uploads/${file}`,
                uploadedAt: stats.mtime
              };
            })
            .sort((a, b) => b.uploadedAt - a.uploadedAt);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(images));
          return;
        }

        // Upload image - using multer
        if (url === '/api/admin/upload' && req.method === 'POST') {
          if (!checkAuth(req, res)) return;

          upload.single('image')(req, res, (err) => {
            if (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message }));
              return;
            }

            if (!req.file) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'No file uploaded' }));
              return;
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              message: 'Image uploaded',
              url: `/uploads/${req.file.filename}`,
              filename: req.file.filename
            }));
          });
          return;
        }

        // Delete image
        if (url.startsWith('/api/admin/images/') && req.method === 'DELETE') {
          if (!checkAuth(req, res)) return;

          const filename = url.split('/')[4];
          const filePath = path.join(__dirname, '../public/uploads', filename);

          if (!fs.existsSync(filePath)) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Image not found' }));
            return;
          }

          fs.unlinkSync(filePath);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Image deleted' }));
          return;
        }

        next();
      });
    }
  };
}
