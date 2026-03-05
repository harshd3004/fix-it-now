const router = require('express').Router();
const bidController = require('../controller/bid.controller');
const { authMiddleware, technicianMiddleware } = require('../middleware/authMiddleware');

// Place a bid on a job
router.post('/', authMiddleware, technicianMiddleware, bidController.placeBid);

module.exports = router;