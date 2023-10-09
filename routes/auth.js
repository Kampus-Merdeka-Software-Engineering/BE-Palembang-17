const express = require("express");

const authController = require('../controllers/auth');
const router = express.Router();

router.post("/register.html", authController.register);

router.post("/login.html", authController.login);

module.exports = router;