const express = require('express');
const {authMiddleware} = require('../middleware/authMiddleware');
const {
    requestReschedule,
    getPendingRescheduleRequests,
    approveRescheduleRequest,
    rejectRescheduleRequest
} = require('../controller/reschedule.controller');

const router = express.Router();

router.post('/:jobId/request', authMiddleware, requestReschedule);

router.get('/:jobId', authMiddleware, getPendingRescheduleRequests);

router.post('/:id/approve', authMiddleware, approveRescheduleRequest);

router.post('/:id/reject', authMiddleware, rejectRescheduleRequest);

module.exports = router;