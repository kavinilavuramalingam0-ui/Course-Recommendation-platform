const LearningPath = require('../models/LearningPath');
const matchService = require('./matchService');
const User = require('../models/User');

const getAllPaths = async () => {
  return await LearningPath.find().populate('courses');
};

const getPathById = async (id) => {
  return await LearningPath.findById(id).populate('courses');
};

const generateCustomPath = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const recommendations = await matchService.getRecommendations(userId);
  
  // Pick top 4 recommendations
  const topCourses = recommendations.slice(0, 4);

  // Synthesize path object
  return {
    id: `custom-${Date.now()}`,
    title: `Personalized ${user.goal || 'Career'} Path`,
    description: `A custom-tailored journey designed to help you reach your goal as a ${user.goal || 'Professional'}.`,
    level: "Personalized",
    courses: topCourses,
    duration: `${topCourses.length * 8}h 30m`, // Estimated duration
    enrolled: Math.floor(Math.random() * 500) + 100,
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
  };
};

module.exports = {
  getAllPaths,
  getPathById,
  generateCustomPath
};
