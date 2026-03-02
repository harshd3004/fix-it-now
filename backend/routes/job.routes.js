const router = require('express').Router();
const jobController = require('../controller/job.controller');
const { authMiddleware } = require('../middleware/authMiddleware')

router.post('/', authMiddleware, jobController.createJob);
router.get('/', authMiddleware, jobController.getJobs);
router.get('/:id', authMiddleware, jobController.getJobById);

module.exports = router;