require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('./config/db');
const { seedDefaultAdminIfConnected } = require('./controllers/authController');

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const newsRoutes = require('./routes/newsRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for admin and frontend clients
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// Express body parsers
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Serve static uploaded WebP images
const uploadsPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/enquiries', enquiryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    institution: 'Atom Institute Perinthalmanna',
    timestamp: new Date().toISOString(),
    imageFormat: 'WebP automatic conversion active via Sharp',
  });
});

// Root API info
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Atom Institute API</title></head>
      <body style="font-family: sans-serif; padding: 40px; line-height: 1.6; max-width: 700px; margin: 0 auto;">
        <h1 style="color: #d32f2f;">Atom Institute API Server</h1>
        <p>Backend API for Atom Institute (Perinthalmanna) website and admin panel.</p>
        <ul>
          <li><strong>Auth:</strong> POST <code>/api/auth/login</code></li>
          <li><strong>Blogs:</strong> GET/POST <code>/api/blogs</code></li>
          <li><strong>News:</strong> GET/POST <code>/api/news</code></li>
          <li><strong>Health Check:</strong> GET <code>/api/health</code></li>
        </ul>
        <p><em>Image uploads are automatically converted to <strong>WebP</strong> format using Sharp before cloud or local persistence.</em></p>
      </body>
    </html>
  `);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server and Connect DB
const startServer = async () => {
  await connectDB();
  await seedDefaultAdminIfConnected();

  app.listen(PORT, () => {
    console.log(`\n🚀 Atom Institute Backend running at: http://localhost:${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔐 Admin Default Email: atominstitute@perinthalmanna.com\n`);
  });
};

startServer();

module.exports = app;

