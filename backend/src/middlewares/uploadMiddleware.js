const multer = require('multer');

// Store file in memory buffer for Sharp processing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept image mimetypes
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, PNG, WEBP, GIF, etc.) are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB max size before conversion
  },
  fileFilter: fileFilter,
});

module.exports = upload;

