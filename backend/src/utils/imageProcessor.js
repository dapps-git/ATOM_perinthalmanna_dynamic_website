const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

/**
 * Converts image buffer to WebP format using Sharp,
 * then uploads to Cloudinary or falls back to local storage.
 * 
 * @param {Buffer} fileBuffer - Input image buffer from multer
 * @param {string} originalName - Original filename
 * @param {string} folder - Target folder (e.g. 'atom_blogs', 'atom_news')
 * @returns {Promise<{url: string, public_id: string, format: string, width: number, height: number}>}
 */
const processAndUploadImage = async (fileBuffer, originalName = 'image', folder = 'atom_institute') => {
  try {
    // 1. Convert image to WebP with optimal compression & metadata stripping
    const webpBuffer = await sharp(fileBuffer)
      .rotate() // auto-orient based on EXIF
      .webp({ quality: 82, effort: 4 })
      .toBuffer();

    const metadata = await sharp(webpBuffer).metadata();

    // 2. If Cloudinary is configured, upload WebP buffer to Cloudinary
    if (isCloudinaryConfigured()) {
      return new Promise((resolve, reject) => {
        const cleanBaseName = path
          .parse(originalName)
          .name.replace(/[^a-zA-Z0-9_-]/g, '_')
          .substring(0, 40);
        const publicId = `${folder}/${cleanBaseName}_${Date.now()}`;

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: publicId,
            folder: folder,
            format: 'webp',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) return reject(error);
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              format: 'webp',
              width: result.width || metadata.width,
              height: result.height || metadata.height,
            });
          }
        );

        uploadStream.end(webpBuffer);
      });
    }

    // 3. Fallback: Save WebP file to local uploads directory
    const uploadsDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const cleanBaseName = path
      .parse(originalName)
      .name.replace(/[^a-zA-Z0-9_-]/g, '_')
      .substring(0, 40);
    const fileName = `${cleanBaseName}_${Date.now()}.webp`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.promises.writeFile(filePath, webpBuffer);

    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    return {
      url: `${baseUrl}/uploads/${fileName}`,
      public_id: fileName,
      format: 'webp',
      width: metadata.width,
      height: metadata.height,
    };
  } catch (error) {
    console.error('Image processing / upload error:', error);
    throw new Error(`Failed to convert image to WebP and upload: ${error.message}`);
  }
};

/**
 * Delete image from Cloudinary or local disk
 */
const deleteImage = async (publicId) => {
  if (!publicId) return;

  try {
    if (isCloudinaryConfigured() && !publicId.endsWith('.webp')) {
      await cloudinary.uploader.destroy(publicId);
    } else {
      const filePath = path.join(__dirname, '../../uploads', publicId);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }
  } catch (err) {
    console.warn(`Could not delete old image ${publicId}:`, err.message);
  }
};

module.exports = {
  processAndUploadImage,
  deleteImage,
};

