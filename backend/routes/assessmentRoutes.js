const express = require('express');
const router = express.Router();
const { saveAssessment, getUserAssessments } = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, saveAssessment);
router.get('/', protect, getUserAssessments);

module.exports = router;
