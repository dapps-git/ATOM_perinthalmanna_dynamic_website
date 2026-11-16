const Result = require('../models/Result');
const { getIsConnected } = require('../config/db');
const { processAndUploadImage, deleteImage } = require('../utils/imageProcessor');
const memoryStore = require('../utils/memoryStore');

/**
 * @desc Get all results / student achievements
 * @route GET /api/results
 */
const getAllResults = async (req, res) => {
  try {
    const {
      search,
      course,
      year,
      page = 1,
      limit = 50,
      publishedOnly = 'false',
    } = req.query;

    if (getIsConnected()) {
      const query = {};

      if (publishedOnly === 'true') {
        query.isPublished = true;
      }

      if (course && course !== 'All') {
        query.course = { $regex: new RegExp(`^${course}$`, 'i') };
      }

      if (year && year !== 'All') {
        query.year = year;
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { course: { $regex: search, $options: 'i' } },
          { college: { $regex: search, $options: 'i' } },
          { rank: { $regex: search, $options: 'i' } },
        ];
      }

      const parsedLimit = parseInt(limit, 10) || 50;
      const parsedPage = parseInt(page, 10) || 1;
      const skip = (parsedPage - 1) * parsedLimit;

      const total = await Result.countDocuments(query);
      const results = await Result.find(query)
        .sort({ order: -1, createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit);

      return res.json({
        success: true,
        count: results.length,
        total,
        page: parsedPage,
        pages: Math.ceil(total / parsedLimit) || 1,
        results,
      });
    }

    // Memory store fallback
    let filtered = [...(memoryStore.results || [])];
    if (publishedOnly === 'true') {
      filtered = filtered.filter((r) => r.isPublished);
    }
    if (course && course !== 'All') {
      filtered = filtered.filter((r) => r.course.toLowerCase() === course.toLowerCase());
    }
    if (year && year !== 'All') {
      filtered = filtered.filter((r) => r.year === year);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name?.toLowerCase().includes(q) ||
          r.course?.toLowerCase().includes(q) ||
          r.college?.toLowerCase().includes(q) ||
          r.rank?.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      count: filtered.length,
      total: filtered.length,
      page: 1,
      pages: 1,
      results: filtered,
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

/**
 * @desc Get single result by ID
 * @route GET /api/results/:id
 */
const getResultById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const result = await Result.findById(id);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Student result not found' });
      }
      return res.json({ success: true, result });
    }

    const item = (memoryStore.results || []).find((r) => r._id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Student result not found' });
    }
    return res.json({ success: true, result: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

/**
 * @desc Create new student result (Admin only)
 * @route POST /api/results
 */
const createResult = async (req, res) => {
  try {
    const { name, course, college, rank, year, order, isPublished } = req.body;

    if (!name || !course || !college) {
      return res.status(400).json({
        success: false,
        message: 'Name, Course, and College Name are required',
      });
    }

    let photo = { url: '', public_id: '', format: 'webp' };

    if (req.file) {
      try {
        const uploaded = await processAndUploadImage(
          req.file.buffer,
          req.file.originalname,
          'atom_results'
        );
        photo = {
          url: uploaded.url,
          public_id: uploaded.public_id,
          format: 'webp',
        };
      } catch (uploadErr) {
        console.error('Failed to upload student photo:', uploadErr);
        // Continue or return error
        return res.status(500).json({
          success: false,
          message: 'Failed to upload photo: ' + uploadErr.message,
        });
      }
    }

    const resultData = {
      name: name.trim(),
      course: course.trim(),
      college: college.trim(),
      photo,
      rank: rank ? rank.trim() : '',
      year: year ? year.trim() : new Date().getFullYear().toString(),
      order: order !== undefined ? parseInt(order, 10) || 0 : 0,
      isPublished: isPublished === undefined ? true : String(isPublished) === 'true',
    };

    if (getIsConnected()) {
      const newResult = await Result.create(resultData);
      return res.status(201).json({
        success: true,
        message: 'Student result added successfully',
        result: newResult,
      });
    }

    // Memory store fallback
    const fallbackItem = {
      _id: 'result-' + Date.now(),
      ...resultData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (!memoryStore.results) memoryStore.results = [];
    memoryStore.results.unshift(fallbackItem);

    return res.status(201).json({
      success: true,
      message: 'Student result added (offline store)',
      result: fallbackItem,
    });
  } catch (error) {
    console.error('Error creating student result:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Update student result (Admin only)
 * @route PUT /api/results/:id
 */
const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, course, college, rank, year, order, isPublished } = req.body;

    if (getIsConnected()) {
      const existing = await Result.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Student result not found' });
      }

      if (name) existing.name = name.trim();
      if (course) existing.course = course.trim();
      if (college) existing.college = college.trim();
      if (rank !== undefined) existing.rank = rank.trim();
      if (year !== undefined) existing.year = year.trim();
      if (order !== undefined) existing.order = parseInt(order, 10) || 0;
      if (isPublished !== undefined) existing.isPublished = String(isPublished) === 'true';

      if (req.file) {
        if (existing.photo?.public_id) {
          await deleteImage(existing.photo.public_id).catch(() => {});
        }
        const uploaded = await processAndUploadImage(
          req.file.buffer,
          req.file.originalname,
          'atom_results'
        );
        existing.photo = {
          url: uploaded.url,
          public_id: uploaded.public_id,
          format: 'webp',
        };
      }

      const updated = await existing.save();
      return res.json({
        success: true,
        message: 'Student result updated successfully',
        result: updated,
      });
    }

    // Memory store fallback
    const idx = (memoryStore.results || []).findIndex((r) => r._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Student result not found' });
    }

    const item = memoryStore.results[idx];
    if (name) item.name = name.trim();
    if (course) item.course = course.trim();
    if (college) item.college = college.trim();
    if (rank !== undefined) item.rank = rank.trim();
    if (year !== undefined) item.year = year.trim();
    if (order !== undefined) item.order = parseInt(order, 10) || 0;
    if (isPublished !== undefined) item.isPublished = String(isPublished) === 'true';

    if (req.file) {
      const uploaded = await processAndUploadImage(
        req.file.buffer,
        req.file.originalname,
        'atom_results'
      );
      item.photo = {
        url: uploaded.url,
        public_id: uploaded.public_id,
        format: 'webp',
      };
    }
    item.updatedAt = new Date().toISOString();

    return res.json({
      success: true,
      message: 'Student result updated (offline store)',
      result: item,
    });
  } catch (error) {
    console.error('Error updating student result:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc Delete student result (Admin only)
 * @route DELETE /api/results/:id
 */
const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const result = await Result.findById(id);
      if (!result) {
        return res.status(404).json({ success: false, message: 'Student result not found' });
      }

      if (result.photo?.public_id) {
        await deleteImage(result.photo.public_id).catch(() => {});
      }

      await Result.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Student result deleted successfully' });
    }

    // Memory store fallback
    const idx = (memoryStore.results || []).findIndex((r) => r._id === id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Student result not found' });
    }

    const removed = memoryStore.results.splice(idx, 1)[0];
    if (removed.photo?.public_id) {
      await deleteImage(removed.photo.public_id).catch(() => {});
    }

    return res.json({ success: true, message: 'Student result deleted successfully' });
  } catch (error) {
    console.error('Error deleting student result:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
};

