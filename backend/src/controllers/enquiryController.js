const Enquiry = require('../models/Enquiry');
const { getIsConnected } = require('../config/db');

// In-memory fallback for enquiries if MongoDB is not connected yet
let memoryEnquiries = [
  {
    _id: 'enquiry-sample-1',
    name: 'Amina Fathima',
    phone: '+91 94471 23456',
    exam: 'NEET',
    message: 'Interested in the 2026-27 NEET repeaters batch with hostel facility.',
    status: 'New',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'enquiry-sample-2',
    name: 'Rahul Krishna',
    phone: '+91 98460 78910',
    exam: 'JEE',
    message: 'Seeking details regarding scholarship test dates for JEE Advanced coaching.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

/**
 * @desc Create new student enquiry (Public)
 * @route POST /api/enquiries
 */
const createEnquiry = async (req, res) => {
  try {
    const { name, phone, exam, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone number are required',
      });
    }

    const enquiryData = {
      name,
      phone,
      exam: exam || 'NEET',
      message: message || '',
      status: 'New',
    };

    if (getIsConnected()) {
      const enquiry = await Enquiry.create(enquiryData);
      return res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully! Our counselors will contact you shortly.',
        enquiry,
      });
    }

    // Memory fallback
    const id = 'enquiry_' + Date.now();
    const newEnquiry = {
      _id: id,
      ...enquiryData,
      createdAt: new Date().toISOString(),
    };
    memoryEnquiries.unshift(newEnquiry);

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! Our counselors will contact you shortly.',
      enquiry: newEnquiry,
    });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ success: false, message: 'Failed to submit enquiry: ' + error.message });
  }
};

/**
 * @desc Get all enquiries (Admin only)
 * @route GET /api/enquiries
 */
const getEnquiries = async (req, res) => {
  try {
    if (getIsConnected()) {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: enquiries.length,
        enquiries,
      });
    }

    return res.json({
      success: true,
      count: memoryEnquiries.length,
      enquiries: memoryEnquiries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

/**
 * @desc Update enquiry status (Admin only)
 * @route PUT /api/enquiries/:id
 */
const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (getIsConnected()) {
      const enquiry = await Enquiry.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      if (!enquiry) {
        return res.status(404).json({ success: false, message: 'Enquiry not found' });
      }
      return res.json({ success: true, enquiry });
    }

    // Memory fallback
    const item = memoryEnquiries.find((e) => e._id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }
    item.status = status;
    return res.json({ success: true, enquiry: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

/**
 * @desc Delete enquiry (Admin only)
 * @route DELETE /api/enquiries/:id
 */
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      await Enquiry.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Enquiry removed successfully' });
    }

    const index = memoryEnquiries.findIndex((e) => e._id === id);
    if (index !== -1) {
      memoryEnquiries.splice(index, 1);
    }
    return res.json({ success: true, message: 'Enquiry removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};

