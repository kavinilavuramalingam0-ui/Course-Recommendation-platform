const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUser);
router.put('/:userId/interests', userController.updateInterests);
router.put('/:userId/goal', userController.updateGoal);

module.exports = router;
