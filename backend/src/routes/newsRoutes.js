const express = require('express');
const router = express.Router();
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Public routes
router.get('/', getAllNews);
router.get('/:identifier', getNewsById);

// Admin-protected routes
router.post('/', authMiddleware, upload.single('coverImage'), createNews);
router.put('/:id', authMiddleware, upload.single('coverImage'), updateNews);
router.delete('/:id', authMiddleware, deleteNews);

module.exports = router;

