const express = require('express');
const router = express.Router();
const learningPathController = require('../controllers/learningPathController');

router.get('/', learningPathController.getAllPaths);
router.get('/:id', learningPathController.getPathById);
router.post('/generate/:userId', learningPathController.generateCustomPath);

module.exports = router;
