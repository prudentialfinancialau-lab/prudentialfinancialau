const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key-change-in-production'; // Change this in production

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Default admin user (username: admin, password: admin123)
// In production, store this in a database with proper hashing
const ADMIN_USER = {
  username: 'admin',
  password: '$2a$10$8Z3LQxMYZ7GVZqGQ7X3Q5.7YV5QwZ0YQ5VZ0YQ5VZ0YQ5VZ0YQ5VZ.' // admin123 hashed
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Login endpoint
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== ADMIN_USER.username) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // For demo purposes, check if password is 'admin123'
    const validPassword = password === 'admin123';

    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username: ADMIN_USER.username }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all content files
app.get('/api/admin/content', authenticateToken, (req, res) => {
  try {
    const contentDir = path.join(__dirname, '../content');
    const pages = ['home', 'about', 'services', 'contact'];

    const allContent = {};

    pages.forEach(page => {
      const filePath = path.join(contentDir, page, 'index.json');
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        allContent[page] = JSON.parse(content);
      }
    });

    res.json(allContent);
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ error: 'Error reading content files' });
  }
});

// Get content for a specific page
app.get('/api/admin/content/:page', authenticateToken, (req, res) => {
  try {
    const { page } = req.params;
    const filePath = path.join(__dirname, '../content', page, 'index.json');

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Page not found' });
    }

    const content = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(content));
  } catch (error) {
    console.error('Error reading page content:', error);
    res.status(500).json({ error: 'Error reading page content' });
  }
});

// Update content for a specific page
app.put('/api/admin/content/:page', authenticateToken, (req, res) => {
  try {
    const { page } = req.params;
    const newContent = req.body;
    const filePath = path.join(__dirname, '../content', page, 'index.json');

    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write the updated content
    fs.writeFileSync(filePath, JSON.stringify(newContent, null, 2));

    res.json({
      message: 'Content updated successfully',
      content: newContent
    });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Error updating content' });
  }
});

// Upload image endpoint
app.post('/api/admin/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    res.json({
      message: 'Image uploaded successfully',
      url: imageUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

// Get list of uploaded images
app.get('/api/admin/images', authenticateToken, (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir);
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        filename: file,
        url: `/uploads/${file}`,
        uploadedAt: fs.statSync(path.join(uploadsDir, file)).mtime
      }))
      .sort((a, b) => b.uploadedAt - a.uploadedAt);

    res.json(images);
  } catch (error) {
    console.error('Error reading images:', error);
    res.status(500).json({ error: 'Error reading images' });
  }
});

// Delete image endpoint
app.delete('/api/admin/images/:filename', authenticateToken, (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    fs.unlinkSync(filePath);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});

app.listen(PORT, () => {
  console.log(`Admin API server running on http://localhost:${PORT}`);
  console.log('Default credentials: username=admin, password=admin123');
});
