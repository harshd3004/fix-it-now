const router = require('express').Router();
const jobController = require('../controller/job.controller');
const { authMiddleware } = require('../middleware/authMiddleware')

router.post('/', authMiddleware, jobController.createJob);

module.exports = router;