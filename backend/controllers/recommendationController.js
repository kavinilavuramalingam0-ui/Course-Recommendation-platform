const matchService = require('../services/matchService');

const getRecommendations = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const recommendations = await matchService.getRecommendations(userId);
    res.status(200).json({ success: true, data: recommendations, message: 'Recommendations fetched successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
};
