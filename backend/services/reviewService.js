const Review = require('../models/Review');
const mongoose = require('mongoose');

const addReview = async (userId, courseId, rating, comment) => {
  const review = new Review({
    userId,
    courseId,
    rating,
    comment,
  });
  await review.save();
  return review;
};

const getCourseAverageRating = async (courseId) => {
  const result = await Review.aggregate([
    { $match: { courseId: new mongoose.Types.ObjectId(courseId) } },
    { $group: { _id: '$courseId', averageRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
  ]);

  if (result.length > 0) {
    return result[0];
  } else {
    return { averageRating: 0, totalReviews: 0 };
  }
};

module.exports = {
  addReview,
  getCourseAverageRating,
};
