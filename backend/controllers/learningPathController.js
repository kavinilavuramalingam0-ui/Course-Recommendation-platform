const learningPathService = require('../services/learningPathService');

const getAllPaths = async (req, res) => {
  try {
    const paths = await learningPathService.getAllPaths();
    res.status(200).json({
      success: true,
      data: paths,
      message: 'Learning paths fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: error.message
    });
  }
};

const getPathById = async (req, res) => {
  try {
    const path = await learningPathService.getPathById(req.params.id);
    if (!path) {
      return res.status(404).json({
        success: false,
        message: 'Learning path not found'
      });
    }
    res.status(200).json({
      success: true,
      data: path,
      message: 'Learning path fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const generateCustomPath = async (req, res) => {
  try {
    const { userId } = req.params;
    const customPath = await learningPathService.generateCustomPath(userId);
    res.status(200).json({
      success: true,
      data: customPath,
      message: 'Custom learning path generated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllPaths,
  getPathById,
  generateCustomPath
};
