const express = require('express');

const router = express.Router();

// importing controllers
const {
    loginUser,
    registerUser
 } = require('../controllers/userControllers');

// login endpoint
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

module.exports = router;
