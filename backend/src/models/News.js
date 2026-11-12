const mongoose = require('mongoose');
const slugify = require('slugify');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'News title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [400, 'Summary cannot exceed 400 characters'],
    },
    content: {
      type: String,
      required: [true, 'News content is required'],
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
    category: {
      type: String,
      default: 'Announcement',
      trim: true,
    },
    badgeText: {
      type: String,
      default: 'NEW',
      trim: true,
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0, // higher priority news appears first / ticker
    },
  },
  { timestamps: true }
);

newsSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug =
      slugify(this.title, { lower: true, strict: true }) +
      '-' +
      Math.random().toString(36).substring(2, 7);
  }
  next();
});

module.exports = mongoose.model('News', newsSchema);

