const express = require('express');

const router = express.Router();

// auth middleware
const auth = require('../middleware/auth');

// importing controllers
const {
    loginUser,
    registerUser,
    getUsers
 } = require('../controllers/userControllers');

// function for getting users
router.get('/', auth, getUsers);

// login endpoint
router.route('/login').post(loginUser);

// register endpoint
router.route('/register').post(registerUser);

module.exports = router;
