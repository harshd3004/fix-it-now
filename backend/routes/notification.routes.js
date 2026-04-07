const router = require('express').Router();
const notificationController = require('../controller/notification.controller');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, notificationController.getNotifications);
router.patch('/:id/mark-read', authMiddleware, notificationController.markAsRead);

module.exports = router;