const reviewService = require('../services/reviewService');
const mongoose = require('mongoose');

const addReview = async (req, res, next) => {
  try {
    const { userId, courseId, rating, comment } = req.body;
    
    if (!userId || !courseId || !rating) {
      return res.status(400).json({ success: false, message: 'userId, courseId, and rating are required', data: [] });
    }
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid userId or courseId format', data: [] });
    }

    const review = await reviewService.addReview(userId, courseId, rating, comment);
    res.status(201).json({ success: true, data: review, message: 'Review added successfully' });
  } catch (error) {
    next(error);
  }
};

const getCourseRating = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid courseId format', data: [] });
    }
    const ratingStats = await reviewService.getCourseAverageRating(courseId);
    
    res.status(200).json({ success: true, data: ratingStats, message: 'Rating stats fetched successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addReview,
  getCourseRating,
};
