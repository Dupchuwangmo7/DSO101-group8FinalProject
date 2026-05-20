/**
 * Post Routes
 * Defines endpoints for community posts
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { verifyToken } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

// Public route
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);

// Protected routes
router.post('/', verifyToken, validate('createPost'), postController.createPost);
router.delete('/:id', verifyToken, postController.deletePost);

module.exports = router;
