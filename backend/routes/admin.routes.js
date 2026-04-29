const router = require('express').Router();
const adminController = require('../controller/admin.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/dashboard-stats', authMiddleware, adminMiddleware, adminController.getDashboardStats);

module.exports = router;
