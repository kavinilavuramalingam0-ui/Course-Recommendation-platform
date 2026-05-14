const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skill: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  proficiency: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'zap'
  }
}, { timestamps: true });

module.exports = mongoose.model('Assessment', assessmentSchema);
