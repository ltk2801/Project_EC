const express = require("express");
const router = express.Router();

const consumerController = require("../controllers/consumer");

// Sử dụng middleware
const isAuth = require("../middleware/is-auth");
// const isPermission = require("../middleware/is-permission");

// GET;
router.get("/category", consumerController.getCategory);

module.exports = router;
