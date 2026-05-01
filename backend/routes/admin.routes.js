const router = require('express').Router();
const adminController = require('../controller/admin.controller');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/dashboard-stats', authMiddleware, adminMiddleware, adminController.getDashboardStats);
router.get('/pending-technicians', authMiddleware, adminMiddleware, adminController.getPendingTechnicians);
router.post('/technicians/:id/approve', authMiddleware, adminMiddleware, adminController.approveTechnicianVerification);
router.post('/technicians/:id/reject', authMiddleware, adminMiddleware, adminController.rejectTechnicianVerification);

module.exports = router;
