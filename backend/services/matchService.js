const Course = require('../models/Course');
const User = require('../models/User');

// Mirrors the goalTagMap from the frontend — used server-side for goal alignment bonus.
const goalTagMap = {
  'Fullstack Developer':  ['react', 'node.js', 'javascript', 'typescript', 'next.js', 'express', 'graphql'],
  'Frontend Engineer':    ['react', 'javascript', 'typescript', 'next.js', 'tailwind css', 'graphql'],
  'Backend Developer':    ['node.js', 'express', 'python', 'graphql', 'docker', 'git'],
  'DevOps Engineer':      ['docker', 'kubernetes', 'aws', 'devops', 'git', 'python'],
  'Data Scientist':       ['python', 'machine learning', 'aws', 'git'],
  'Cloud Architect':      ['aws', 'docker', 'kubernetes', 'devops'],
};

const getRecommendations = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const userInterests = user.interestTags.map(tag => tag.toLowerCase());
  const goalTags = goalTagMap[user.goal] || [];
  const courses = await Course.find();

  // Tag-Matching Algorithm:
  // Base match of 30% if at least one interest tag matches, +20% per matching tag.
  // Goal alignment bonus: +10% if course tags overlap with the user's chosen career path.
  const scoredCourses = courses.map(course => {
    const courseTags = course.categoryTags.map(tag => tag.toLowerCase());
    let score = 0;

    const matchingTags = courseTags.filter(tag => userInterests.includes(tag));
    const gapTags = courseTags.filter(tag => !userInterests.includes(tag));

    if (matchingTags.length > 0) {
      score = 30 + (matchingTags.length * 20);
    }

    // Goal alignment bonus: applies if the course is relevant to the user's career path,
    // even if the user didn't explicitly select those tags as interests.
    const hasGoalAlignment = goalTags.length > 0 && courseTags.some(tag => goalTags.includes(tag));
    if (hasGoalAlignment) {
      score += 10;
    }

    if (score > 100) score = 100;

    return {
      ...course.toObject(),
      matchScore: score,
      matchedTags: matchingTags,
      gapTags: gapTags
    };
  });

  // Sort by highest match score
  return scoredCourses.sort((a, b) => b.matchScore - a.matchScore);
};

module.exports = {
  getRecommendations,
};
