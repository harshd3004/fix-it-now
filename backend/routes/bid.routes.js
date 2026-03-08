const router = require('express').Router();
const bidController = require('../controller/bid.controller');
const { authMiddleware, technicianMiddleware } = require('../middleware/authMiddleware');


module.exports = router;