const Blog = require('../models/Blog');
const { getIsConnected } = require('../config/db');
const { processAndUploadImage, deleteImage } = require('../utils/imageProcessor');
const memoryStore = require('../utils/memoryStore');
const slugify = require('slugify');

/**
 * @desc Get all blogs (Public & Admin)
 * @route GET /api/blogs
 */
const getAllBlogs = async (req, res) => {
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
          { excerpt: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      const total = await Blog.countDocuments(query);
      const blogs = await Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      return res.json({
        success: true,
        count: blogs.length,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        blogs,
      });
    }

    // Memory Store Fallback
    let filtered = [...memoryStore.blogs];
    if (publishedOnly === 'true') {
      filtered = filtered.filter((b) => b.isPublished);
    }
    if (category && category !== 'All') {
      filtered = filtered.filter((b) => b.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          (b.excerpt && b.excerpt.toLowerCase().includes(q)) ||
          b.content.toLowerCase().includes(q)
      );
    }

    return res.json({
      success: true,
      count: filtered.length,
      total: filtered.length,
      page: 1,
      pages: 1,
      blogs: filtered,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

/**
 * @desc Get single blog by ID or Slug
 * @route GET /api/blogs/:identifier
 */
const getBlogById = async (req, res) => {
  try {
    const { identifier } = req.params;

    if (getIsConnected()) {
      const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
      const blog = isObjectId
        ? await Blog.findById(identifier)
        : await Blog.findOne({ slug: identifier });

      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog post not found' });
      }

      // Increment views
      blog.views = (blog.views || 0) + 1;
      await blog.save();

      return res.json({ success: true, blog });
    }

    // Memory store fallback
    const blog = memoryStore.blogs.find(
      (b) => b._id === identifier || b.slug === identifier
    );
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog post not found' });
    }
    blog.views = (blog.views || 0) + 1;
    return res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error: ' + error.message });
  }
};

/**
 * @desc Create new blog (Admin only)
 * @route POST /api/blogs
 */
const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, category, tags, isPublished } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      });
    }

    // Parse tags array
    let parsedTags = [];
    if (tags) {
      if (Array.isArray(tags)) {
        parsedTags = tags;
      } else if (typeof tags === 'string') {
        parsedTags = tags.split(',').map((t) => t.trim()).filter(Boolean);
      }
    }

    let coverImage = { url: '', public_id: '', format: 'webp' };

    // Process image with Sharp (convert to WebP) and upload
    if (req.file) {
      const uploaded = await processAndUploadImage(
        req.file.buffer,
        req.file.originalname,
        'atom_blogs'
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

    const blogData = {
      title,
      excerpt: excerpt || content.substring(0, 150) + '...',
      content,
      author: author || 'Atom Institute Perinthalmanna',
      category: category || 'General',
      tags: parsedTags,
      coverImage,
      isPublished: isPublished === undefined ? true : isPublished === 'true' || isPublished === true,
    };

    if (getIsConnected()) {
      const newBlog = await Blog.create(blogData);
      return res.status(201).json({
        success: true,
        message: 'Blog created successfully with WebP image format!',
        blog: newBlog,
      });
    }

    // Memory store fallback
    const id = 'blog_' + Date.now();
    const slug = slugify(title, { lower: true, strict: true }) + '-' + Math.random().toString(36).substring(2, 6);
    const newBlog = {
      _id: id,
      ...blogData,
      slug,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    memoryStore.blogs.unshift(newBlog);

    return res.status(201).json({
      success: true,
      message: 'Blog created successfully (WebP converted)!',
      blog: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ success: false, message: 'Failed to create blog: ' + error.message });
  }
};

/**
 * @desc Update existing blog (Admin only)
 * @route PUT /api/blogs/:id
 */
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, author, category, tags, isPublished } = req.body;

    let updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (excerpt !== undefined) updateFields.excerpt = excerpt;
    if (content !== undefined) updateFields.content = content;
    if (author !== undefined) updateFields.author = author;
    if (category !== undefined) updateFields.category = category;
    if (isPublished !== undefined) {
      updateFields.isPublished = isPublished === 'true' || isPublished === true;
    }
    if (tags !== undefined) {
      updateFields.tags = Array.isArray(tags)
        ? tags
        : tags.split(',').map((t) => t.trim()).filter(Boolean);
    }

    // Handle new image upload
    if (req.file) {
      const uploaded = await processAndUploadImage(
        req.file.buffer,
        req.file.originalname,
        'atom_blogs'
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
      const existingBlog = await Blog.findById(id);
      if (!existingBlog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      // If updating image and old image exists, clean up old one
      if (req.file && existingBlog.coverImage && existingBlog.coverImage.public_id) {
        await deleteImage(existingBlog.coverImage.public_id);
      }

      const updated = await Blog.findByIdAndUpdate(id, updateFields, { new: true });
      return res.json({
        success: true,
        message: 'Blog updated successfully',
        blog: updated,
      });
    }

    // Memory Store fallback
    const index = memoryStore.blogs.findIndex((b) => b._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    memoryStore.blogs[index] = {
      ...memoryStore.blogs[index],
      ...updateFields,
      updatedAt: new Date().toISOString(),
    };

    return res.json({
      success: true,
      message: 'Blog updated successfully',
      blog: memoryStore.blogs[index],
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ success: false, message: 'Failed to update blog: ' + error.message });
  }
};

/**
 * @desc Delete blog (Admin only)
 * @route DELETE /api/blogs/:id
 */
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }

      if (blog.coverImage && blog.coverImage.public_id) {
        await deleteImage(blog.coverImage.public_id);
      }

      await Blog.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Blog deleted successfully' });
    }

    // Memory store fallback
    const index = memoryStore.blogs.findIndex((b) => b._id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    memoryStore.blogs.splice(index, 1);

    return res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ success: false, message: 'Failed to delete blog: ' + error.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};

