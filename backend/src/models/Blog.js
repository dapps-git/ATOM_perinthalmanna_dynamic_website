const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [350, 'Excerpt cannot exceed 350 characters'],
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    coverImage: {
      url: {
        type: String,
        default: '',
      },
      public_id: {
        type: String,
        default: '',
      },
      format: {
        type: String,
        default: 'webp',
      },
    },
    author: {
      type: String,
      default: 'Atom Institute Perinthalmanna',
      trim: true,
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isPublished: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

blogSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug =
      slugify(this.title, { lower: true, strict: true }) +
      '-' +
      Math.random().toString(36).substring(2, 7);
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);

