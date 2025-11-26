const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/roleMiddleware');

// Protected admin routes
router.get('/dashboard-stats', authMiddleware, isAdmin, adminController.getDashboardStats);

module.exports = router;
