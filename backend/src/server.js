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

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://admin-kyol.vercel.app',
  'https://tweaki.pw',
  // add more origins below if needed
  /\.vercel\.app$/,
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, server-to-server)
    if (!origin) return callback(null, true);
    const allowed = ALLOWED_ORIGINS.some((o) =>
      o instanceof RegExp ? o.test(origin) : o === origin
    );
    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

// Enable CORS for all routes + handle preflight OPTIONS globally
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Express body parsers
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Serve static uploaded WebP images
const uploadsPath = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));
app.use('/atom_institution/uploads', express.static(uploadsPath));

// Unified API Router
const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('/blogs', blogRoutes);
apiRouter.use('/news', newsRoutes);
apiRouter.use('/enquiries', enquiryRoutes);

// Health check endpoint
const healthCheckHandler = (req, res) => {
  res.json({
    status: 'online',
    institution: 'Atom Institute Perinthalmanna',
    timestamp: new Date().toISOString(),
  });
};

apiRouter.get('/health', healthCheckHandler);
app.get('/api/health', healthCheckHandler);
app.get('/atom_institution/api/health', healthCheckHandler);
app.get('/atom_institution/health', healthCheckHandler);

// Mount API routes for both standard and subpath deployments (/atom_institution)
app.use('/api', apiRouter);
app.use('/atom_institution/api', apiRouter);
app.use('/atom_institution', apiRouter);

// Root API info
const rootInfoHandler = (req, res) => {
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
      </body>
    </html>
  `);
};

app.get('/', rootInfoHandler);
app.get('/atom_institution', rootInfoHandler);

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

