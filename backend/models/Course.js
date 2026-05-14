const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    default: 'Pluralsight',
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
  },
  courseUrl: {
    type: String,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate',
  },
  categoryTags: {
    type: [String],
    default: [],
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
