const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      maxlength: [150, 'Name cannot exceed 150 characters'],
    },
    course: {
      type: String,
      required: [true, 'Course is required'],
      trim: true,
      maxlength: [120, 'Course cannot exceed 120 characters'],
    },
    college: {
      type: String,
      required: [true, 'College name is required'],
      trim: true,
      maxlength: [250, 'College name cannot exceed 250 characters'],
    },
    photo: {
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
    rank: {
      type: String,
      trim: true,
      default: '',
    },
    year: {
      type: String,
      trim: true,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

resultSchema.index({ isPublished: 1, order: -1, createdAt: -1 });

module.exports = mongoose.model('Result', resultSchema);

