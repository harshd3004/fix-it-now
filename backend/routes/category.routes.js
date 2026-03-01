const router = require('express').Router();
const categoryController = require('../controller/category.controller');

router.get('/', categoryController.getAllCategories);

module.exports = router;