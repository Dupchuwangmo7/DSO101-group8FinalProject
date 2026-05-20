/**
 * Admin Routes
 * Defines endpoints for administrative functions
 * Protected: Requires admin role
 */

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// All admin routes require admin role
router.get('/users', verifyToken, verifyAdmin, adminController.getAllUsers);
router.delete('/post/:id', verifyToken, verifyAdmin, adminController.deletePostAdmin);
router.put('/post/:id/flag', verifyToken, verifyAdmin, adminController.flagPost);
router.get('/dashboard', verifyToken, verifyAdmin, adminController.getDashboardStats);

module.exports = router;
