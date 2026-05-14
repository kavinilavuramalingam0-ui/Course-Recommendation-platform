const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.addReview);
router.get('/course/:courseId/average', reviewController.getCourseRating);

module.exports = router;
