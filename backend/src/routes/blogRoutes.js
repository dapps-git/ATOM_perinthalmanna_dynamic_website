const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Public routes
router.get('/', getAllBlogs);
router.get('/:identifier', getBlogById);

// Admin-protected routes
router.post('/', authMiddleware, upload.single('coverImage'), createBlog);
router.put('/:id', authMiddleware, upload.single('coverImage'), updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;

