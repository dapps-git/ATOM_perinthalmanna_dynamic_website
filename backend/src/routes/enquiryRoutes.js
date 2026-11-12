const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public enquiry submission
router.post('/', createEnquiry);

// Admin-protected enquiry management
router.get('/', authMiddleware, getEnquiries);
router.put('/:id', authMiddleware, updateEnquiryStatus);
router.delete('/:id', authMiddleware, deleteEnquiry);

module.exports = router;

