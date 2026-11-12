# Atom Institute Web Platform

Full-stack platform for **Atom Institute, Perinthalmanna**.

## Architecture & Project Structure

```
ATOM_NEW/
├── backend/            # Node.js + Express API Server
│   ├── src/
│   │   ├── config/     # MongoDB & Cloudinary configuration
│   │   ├── controllers/# Auth, Blog & News Controllers
│   │   ├── middlewares/# JWT Auth & Multer Memory Storage
│   │   ├── models/     # Admin, Blog, and News Mongoose schemas
│   │   ├── routes/     # Express API routes
│   │   ├── utils/      # Sharp WebP image processing pipeline
│   │   └── server.js   # Express entrypoint
│   ├── uploads/        # Local fallback storage for converted WebP images
│   ├── .env            # Environment configuration
│   └── package.json
│
├── admin/              # React + Vite + Tailwind Admin Panel (White & Red Theme)
│   ├── src/
│   │   ├── components/ # Navbar, Sidebar, Modal
│   │   ├── pages/      # Login, Dashboard, BlogManager, NewsManager, SystemStatus
│   │   ├── services/   # API client
│   │   └── App.jsx
│   ├── public/         # Atom logo & static assets
│   └── package.json
│
└── frontend/           # Next.js Frontend Framework (To be expanded in Next Phase)
    ├── src/
    │   ├── app/        # App Router (Home, blogs, news)
    │   └── lib/        # API client
    ├── public/         # Atom logo & static assets
    └── package.json
```

## Admin Portal Predefined Credentials

- **Admin Email**: `atominstitute@perinthalmanna.com`
- **Admin Password**: `atominstitute@#perinthalmanna`

## WebP Image Pipeline

- All uploaded images (PNG, JPG, JPEG, etc.) are intercepted in memory by **Multer** and converted to **WebP** (`format: 'webp'`, quality: `82%`) using the **Sharp** engine before persistence.
- When Cloudinary credentials are provided in `backend/.env`, images stream directly into the Cloudinary `atom_institute` folder.
- If Cloudinary credentials are not configured yet, the backend automatically uses a local fallback WebP storage under `backend/uploads/` so you can create blogs and news right away without errors.

## Running the Project

### 1. Backend Server
```bash
cd backend
npm run dev
# Running on http://localhost:5000
```

### 2. Admin Panel
```bash
cd admin
npm run dev
# Running on http://localhost:5173
```

### 3. Adding MongoDB & Cloudinary Credentials
Open `backend/.env` and update:
```env
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

