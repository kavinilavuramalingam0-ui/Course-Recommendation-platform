const mongoose = require('mongoose');

const LearningPathSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate',
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  duration: {
    type: String,
  },
  enrolled: {
    type: Number,
    default: 0
  },
  thumbnail: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('LearningPath', LearningPathSchema);
