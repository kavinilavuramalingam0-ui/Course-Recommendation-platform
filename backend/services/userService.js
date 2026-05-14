const User = require('../models/User');

const updateInterests = async (userId, interestTags) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.interestTags = interestTags;
  await user.save();
  return user;
};

const updateGoal = async (userId, goal) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.goal = goal;
  await user.save();
  return user;
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

module.exports = {
  updateInterests,
  updateGoal,
  getUserById,
};
