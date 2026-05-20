/**
 * Mood Tracker Routes
 * Defines endpoints for mood logging and analytics
 */

const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const { verifyToken } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

// All mood routes are protected
router.post('/', verifyToken, validate('addMood'), moodController.addMood);
router.get('/history', verifyToken, moodController.getMoodHistory);
router.get('/stats', verifyToken, moodController.getMoodStats);

module.exports = router;
