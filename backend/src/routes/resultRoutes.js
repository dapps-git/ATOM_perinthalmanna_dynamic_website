const express = require('express');
const router = express.Router();
const {
  getAllResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
} = require('../controllers/resultController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Public routes
router.get('/', getAllResults);
router.get('/:id', getResultById);

// Admin-protected routes
router.post('/', authMiddleware, upload.single('photo'), createResult);
router.put('/:id', authMiddleware, upload.single('photo'), updateResult);
router.delete('/:id', authMiddleware, deleteResult);

module.exports = router;

