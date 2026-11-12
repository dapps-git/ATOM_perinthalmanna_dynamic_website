const News = require('../models/News');
const { getIsConnected } = require('../config/db');
const { processAndUploadImage, deleteImage } = require('../utils/imageProcessor');
const memoryStore = require('../utils/memoryStore');
const slugify = require('slugify');

/**
 * @desc Get all news
 * @route GET /api/news
 */
const getAllNews = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10, publishedOnly = 'false' } = req.query;

    if (getIsConnected()) {
      const query = {};

      if (publishedOnly === 'true') {
        query.isPublished = true;
      }

      if (category && category !== 'All') {
        query.category = category;
      }

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { summary: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const total = await News.countDocuments(query);
      const news = await News.find(query)
        .sort({ priority: -1, publishDate: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      return res.json({
        success: true,
        count: news.length,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        news,
      });
    }

    // Memory Store Fallback
    let filtered = [...memoryStore.newsList];
    if (publishedOnly === 'true') {
      filtered = filtered.filter((n) => n.isPublished);
    }
    if (category && category !== 'All') {
      filtered = filtered.filter((n) => n.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          (n.summary && n.summary.toLowerCase().includes(q)) ||
          n.content.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      count: filtered.length,
      total: filtered.length,
      page: 1,
      pages: 1,
      news: filtered,
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

/**
 * @desc Get single news item by ID or Slug
 * @route GET /api/news/:identifier
 */
const getNewsById = async (req, res) => {
  try {
    const { identifier } = req.params;

    if (getIsConnected()) {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
      const item = isObjectId
        ? await News.findById(identifier)
        : await News.findOne({ slug: identifier });

      if (!item) {
        return res.status(404).json({ success: false, message: 'News article not found' });
      }

      return res.json({ success: true, news: item });
    }

    // Memory Store Fallback
    const item = memoryStore.newsList.find(
      (n) => n._id === identifier || n.slug === identifier
    );
    if (!item) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }

    return res.json({ success: true, news: item });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

/**
 * @desc Create new news item (Admin only)
 * @route POST /api/news
 */
const createNews = async (req, res) => {
  try {
    const { title, summary, content, category, badgeText, publishDate, priority, isPublished } =
      req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      });
    }

    let coverImage = { url: '', public_id: '', format: 'webp' };

    // Process image with Sharp (convert to WebP) and upload
    if (req.file) {
      const uploaded = await processAndUploadImage(
        req.file.buffer,
        req.file.originalname,
        'atom_news'
      );
      coverImage = {
        url: uploaded.url,
        public_id: uploaded.public_id,
        format: 'webp',
      };
    } else if (req.body.imageUrl) {
      coverImage = {
        url: req.body.imageUrl,
        public_id: 'external_url',
        format: 'webp',
      };
    }

    const newsData = {
      title,
      summary: summary || content.substring(0, 150) + '...',
      content,
      category: category || 'Announcement',
      badgeText: badgeText || 'UPDATE',
      publishDate: publishDate ? new Date(publishDate) : new Date(),
      priority: priority ? parseInt(priority) : 0,
      coverImage,
      isPublished: isPublished === undefined ? true : isPublished === 'true' || isPublished === true,
    };

    if (getIsConnected()) {
      const newNews = await News.create(newsData);
      return res.status(201).json({
        success: true,
        message: 'News published successfully with WebP image format!',
        news: newNews,
      });
    }

    // Memory Store Fallback
    const id = 'news_' + Date.now();
    const slug = slugify(title, { lower: true, strict: true }) + '-' + Math.random().toString(36).substring(2, 6);
    const newNews = {
      _id: id,
      ...newsData,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryStore.newsList.unshift(newNews);

    return res.status(201).json({
      success: true,
      message: 'News article published successfully (WebP converted)!',
      news: newNews,
    });
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ success: false, message: 'Failed to create news: ' + error.message });
  }
};

/**
 * @desc Update existing news item (Admin only)
 * @route PUT /api/news/:id
 */
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content, category, badgeText, publishDate, priority, isPublished } =
      req.body;

    let updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (summary !== undefined) updateFields.summary = summary;
    if (content !== undefined) updateFields.content = content;
    if (category !== undefined) updateFields.category = category;
    if (badgeText !== undefined) updateFields.badgeText = badgeText;
    if (publishDate !== undefined) updateFields.publishDate = new Date(publishDate);
    if (priority !== undefined) updateFields.priority = parseInt(priority);
    if (isPublished !== undefined) {
      updateFields.isPublished = isPublished === 'true' || isPublished === true;
    }

    // Handle new image upload
    if (req.file) {
      const uploaded = await processAndUploadImage(
        req.file.buffer,
        req.file.originalname,
        'atom_news'
      );
      updateFields.coverImage = {
        url: uploaded.url,
        public_id: uploaded.public_id,
        format: 'webp',
      };
    } else if (req.body.imageUrl) {
      updateFields.coverImage = {
        url: req.body.imageUrl,
        public_id: 'external_url',
        format: 'webp',
      };
    }

    if (getIsConnected()) {
      const existing = await News.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'News item not found' });
      }

      if (req.file && existing.coverImage && existing.coverImage.public_id) {
        await deleteImage(existing.coverImage.public_id);
      }

      const updated = await News.findByIdAndUpdate(id, updateFields, { new: true });
      return res.json({
        success: true,
        message: 'News updated successfully',
        news: updated,
      });
    }

    // Memory Store Fallback
    const index = memoryStore.newsList.findIndex((n) => n._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'News item not found' });
    }

    memoryStore.newsList[index] = {
      ...memoryStore.newsList[index],
      ...updateFields,
      updatedAt: new Date().toISOString(),
    };

    return res.json({
      success: true,
      message: 'News updated successfully',
      news: memoryStore.newsList[index],
    });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ success: false, message: 'Failed to update news: ' + error.message });
  }
};

/**
 * @desc Delete news item (Admin only)
 * @route DELETE /api/news/:id
 */
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const newsItem = await News.findById(id);
      if (!newsItem) {
        return res.status(404).json({ success: false, message: 'News not found' });
      }

      if (newsItem.coverImage && newsItem.coverImage.public_id) {
        await deleteImage(newsItem.coverImage.public_id);
      }

      await News.findByIdAndDelete(id);
      return res.json({ success: true, message: 'News deleted successfully' });
    }

    // Memory store fallback
    const index = memoryStore.newsList.findIndex((n) => n._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }
    memoryStore.newsList.splice(index, 1);

    return res.json({ success: true, message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ success: false, message: 'Failed to delete news: ' + error.message });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};

