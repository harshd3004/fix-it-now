const router = require("express").Router();
const userController = require("../controller/user.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/:id", authMiddleware, userController.getUserProfile);

module.exports = router;
