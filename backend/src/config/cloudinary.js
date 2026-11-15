const cloudinary = require('cloudinary').v2;

const getCloudName = () => (process.env.CLOUDINARY_CLOUD_NAME || '').trim();
const getApiKey = () => (process.env.CLOUDINARY_API_KEY || '').trim();
const getApiSecret = () => {
  let secret = (process.env.CLOUDINARY_API_SECRET || '').trim();
  // Self-healing: if cPanel truncated the trailing 'I' (26 characters instead of 27)
  if (secret === 'MkcYrpzLwjsP6c7tc_KszuXGp4') {
    secret = 'MkcYrpzLwjsP6c7tc_KszuXGp4I';
  }
  return secret;
};

const isCloudinaryConfigured = () => {
  const name = getCloudName();
  const key = getApiKey();
  const secret = getApiSecret();

  return (
    name &&
    name !== 'YOUR_CLOUD_NAME' &&
    key &&
    key !== 'YOUR_API_KEY' &&
    secret &&
    secret !== 'YOUR_API_SECRET'
  );
};

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: getCloudName(),
    api_key: getApiKey(),
    api_secret: getApiSecret(),
    secure: true,
  });
  console.log('✅ Cloudinary initialized successfully');
} else {
  console.warn('⚠️ [Cloudinary Notice] Cloudinary credentials not configured yet. Fallback local WebP storage will be used.');
}

module.exports = { cloudinary, isCloudinaryConfigured };
