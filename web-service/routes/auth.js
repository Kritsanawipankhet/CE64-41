const express = require("express");
const DebugControl = require("../utils/debug.js");
const loginController = require("../controllers/login-controller.js");
const router = express.Router();

router.get("/auth", loginController.login);

module.exports = router;
