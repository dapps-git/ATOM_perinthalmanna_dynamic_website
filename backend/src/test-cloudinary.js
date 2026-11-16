require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const api_key = process.env.CLOUDINARY_API_KEY?.trim();
const api_secret = process.env.CLOUDINARY_API_SECRET?.trim();

console.log('--- Cloudinary Diagnostic Test ---');
console.log('CLOUDINARY_CLOUD_NAME:', cloud_name);
console.log('CLOUDINARY_API_KEY:', api_key);
console.log('CLOUDINARY_API_SECRET length:', api_secret ? api_secret.length : 0);
console.log('CLOUDINARY_API_SECRET preview:', api_secret ? `${api_secret.substring(0, 4)}...${api_secret.slice(-4)}` : 'MISSING');

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
});

// Test 1: Ping the Cloudinary API
cloudinary.api.ping((err, res) => {
  if (err) {
    console.error('\n❌ Cloudinary API ping failed:');
    console.error('Status:', err.http_code);
    console.error('Message:', err.message);
  } else {
    console.log('\n✅ Cloudinary API ping SUCCESS:', res);
  }

  // Test 2: Perform a real 1x1 pixel test upload
  const sample1x1Png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  cloudinary.uploader.upload(
    sample1x1Png,
    { folder: 'atom_test', format: 'webp' },
    (upErr, upRes) => {
      if (upErr) {
        console.error('\n❌ Test upload failed:');
        console.error('Message:', upErr.message);
        console.error('\n💡 Root cause: Check your Cloudinary Console (https://console.cloudinary.com/) -> API Keys to confirm the exact Cloud Name, API Key, and API Secret.');
      } else {
        console.log('\n✅ Test upload SUCCESSFUL!');
        console.log('Uploaded image URL:', upRes.secure_url);
        // Clean up
        cloudinary.uploader.destroy(upRes.public_id, () => {
          console.log('Cleaned up test image.');
        });
      }
    }
  );
});

