// import expressjs
const express = require('express');

// define router
const router = express.Router();

// import controller
const usersController = require('../controllers/users.controllers');

// define routes
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/logout', usersController.logoutUser);

// export router
module.exports = router;