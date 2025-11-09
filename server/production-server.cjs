const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Paths
const DIST_DIR = path.join(__dirname, '../dist');
const CONTENT_DIR = path.join(__dirname, '../public/content');
const UPLOADS_DIR = path.join(__dirname, '../public/uploads');

// Admin credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// Middleware
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    cb(null, UPLOADS_DIR);
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

// Auth middleware
function checkAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = auth.split(' ')[1];
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const [username, password] = decoded.split(':');
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      return next();
    }
  } catch (e) {
    // Invalid token
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}

// API Routes

// Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    res.json({ token, message: 'Login successful' });
  } else {
    res.status(400).json({ error: 'Invalid credentials' });
  }
});

// Get all content
app.get('/api/admin/content', checkAuth, (req, res) => {
  const pages = ['home', 'about', 'services', 'contact'];
  const allContent = {};

  pages.forEach(page => {
    const filePath = path.join(CONTENT_DIR, page, 'index.json');
    if (fs.existsSync(filePath)) {
      allContent[page] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
  });

  res.json(allContent);
});

// Get specific page content
app.get('/api/admin/content/:page', checkAuth, (req, res) => {
  const { page } = req.params;
  const filePath = path.join(CONTENT_DIR, page, 'index.json');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Page not found' });
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(content);
});

// Update page content
app.put('/api/admin/content/:page', checkAuth, (req, res) => {
  const { page } = req.params;
  const newContent = req.body;
  const filePath = path.join(CONTENT_DIR, page, 'index.json');
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2));
  res.json({ message: 'Content updated', content: newContent });
});

// Get uploaded images
app.get('/api/admin/images', checkAuth, (req, res) => {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }

  const files = fs.readdirSync(UPLOADS_DIR);
  const images = files
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map(file => {
      const stats = fs.statSync(path.join(UPLOADS_DIR, file));
      return {
        filename: file,
        url: `/uploads/${file}`,
        uploadedAt: stats.mtime
      };
    })
    .sort((a, b) => b.uploadedAt - a.uploadedAt);

  res.json(images);
});

// Upload image
app.post('/api/admin/upload', checkAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'Image uploaded',
    url: `/uploads/${req.file.filename}`,
    filename: req.file.filename
  });
});

// Delete image
app.delete('/api/admin/images/:filename', checkAuth, (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(UPLOADS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Image not found' });
  }

  fs.unlinkSync(filePath);
  res.json({ message: 'Image deleted' });
});

// Serve content JSON files with no-cache headers
app.use('/content', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
}, express.static(path.join(__dirname, '../public/content')));

// Serve uploads folder
app.use('/uploads', express.static(UPLOADS_DIR));

// Serve other static files from public
app.use(express.static(path.join(__dirname, '../public')));

// Serve built React app
app.use(express.static(DIST_DIR));

// SPA fallback - serve index.html for all non-API routes
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/') && !req.path.startsWith('/content/') && !req.path.startsWith('/uploads/')) {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  } else {
    next();
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Production server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${DIST_DIR}`);
  console.log(`📝 Content directory: ${CONTENT_DIR}`);
  console.log(`🔐 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`   Username: ${ADMIN_USER}`);
  console.log(`   Password: ${ADMIN_PASS}\n`);
});
