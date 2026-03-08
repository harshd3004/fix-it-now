const router = require('express').Router();
const bidController = require('../controller/bid.controller');
const { authMiddleware} = require('../middleware/authMiddleware');

router.post('/:id/accept', authMiddleware, bidController.acceptBid);
router.post('/:id/reject', authMiddleware, bidController.rejectBid);

module.exports = router;