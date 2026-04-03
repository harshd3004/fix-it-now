const router = require('express').Router();
const jobController = require('../controller/job.controller');
const bidController = require('../controller/bid.controller');
const { authMiddleware, technicianMiddleware } = require('../middleware/authMiddleware');


router.post('/', authMiddleware, jobController.createJob);
router.get('/', authMiddleware, jobController.getJobs);

router.post('/:id/bids', authMiddleware, technicianMiddleware, bidController.placeBid);
router.get('/:id/bids', authMiddleware, bidController.getBidsForJob);
router.post('/:id/update-status', authMiddleware, technicianMiddleware, jobController.updateJobStatus);
router.get('/:id/status-request', authMiddleware, jobController.getStatusRequestsForJob);

router.get('/:id', authMiddleware, jobController.getJobById);

module.exports = router;