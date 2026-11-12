const cloudinary = require('cloudinary').v2;

const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_CLOUD_NAME !== 'YOUR_CLOUD_NAME' &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_KEY !== 'YOUR_API_KEY' &&
    process.env.CLOUDINARY_API_SECRET &&
    process.env.CLOUDINARY_API_SECRET !== 'YOUR_API_SECRET'
  );
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log('✅ Cloudinary initialized successfully');
} else {
  console.warn('⚠️ [Cloudinary Notice] Cloudinary credentials not configured yet. Fallback local WebP storage will be used.');
}

module.exports = { cloudinary, isCloudinaryConfigured };

