const router = require('express').Router();
const jobController = require('../controller/job.controller')
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/:id/approve', authMiddleware, jobController.approveStatusUpdate)
router.post('/:id/reject', authMiddleware, jobController.rejectStatusUpdate)

module.exports = router;