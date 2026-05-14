const Assessment = require('../models/Assessment');

const saveAssessment = async (req, res) => {
  try {
    const { skill, score, proficiency, date, icon } = req.body;
    
    const assessment = new Assessment({
      user: req.user.id,
      skill,
      score,
      proficiency,
      date,
      icon
    });

    const savedAssessment = await assessment.save();
    res.status(201).json({ success: true, data: savedAssessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: assessments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  saveAssessment,
  getUserAssessments
};
