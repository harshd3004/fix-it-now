const router = require('express').Router();
const jobController = require('../controller/job.controller');
const bidController = require('../controller/bid.controller');
const { authMiddleware, technicianMiddleware } = require('../middleware/authMiddleware');
const Bid = require('../models/Bid');


router.post('/', authMiddleware, jobController.createJob);
router.get('/', authMiddleware, jobController.getJobs);

router.post('/:id/bids', authMiddleware, technicianMiddleware, bidController.placeBid);
router.get('/:id/bids', authMiddleware, bidController.getBidsForJob);

router.get('/:id', authMiddleware, jobController.getJobById);

module.exports = router;