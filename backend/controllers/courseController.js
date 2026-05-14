const Course = require('../models/Course');

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses, message: 'All courses retrieved' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCourses,
};
