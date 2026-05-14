const userService = require('../services/userService');
const User = require('../models/User');
const mongoose = require('mongoose');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users, message: 'All users retrieved' });
  } catch (error) {
    next(error);
  }
};

const updateInterests = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { interestTags } = req.body;
    
    if (!interestTags || !Array.isArray(interestTags)) {
      return res.status(400).json({ success: false, message: 'interestTags must be an array', data: [] });
    }

    const updatedUser = await userService.updateInterests(userId, interestTags);
    res.status(200).json({ success: true, data: updatedUser, message: 'Interests updated successfully' });
  } catch (error) {
    next(error);
  }
};

const updateGoal = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { goal } = req.body;

    if (!goal || typeof goal !== 'string') {
      return res.status(400).json({ success: false, message: 'goal must be a non-empty string', data: [] });
    }

    const updatedUser = await userService.updateGoal(userId, goal);
    res.status(200).json({ success: true, data: updatedUser, message: 'Goal updated successfully' });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format', data: [] });
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found', data: [] });
    }
    res.status(200).json({ success: true, data: user, message: 'User retrieved' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  updateInterests,
  updateGoal,
  getUser,
};
