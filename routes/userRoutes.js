const express = require('express');

const router = express.Router();

// auth middleware
const auth = require('../middleware/auth');

// endpoint guard middlewares
const { adminGuard } = require('../middleware/guards');

// importing controllers
const {
    loginUser,
    registerUser,
    getUsers,
    getUser,
    deleteUser,
    getMe
 } = require('../controllers/userControllers');

// function for getting users
router.route('/').get(auth, adminGuard, getUsers);
router.route('/me').get(auth, getMe);

router.route('/:id')
.get(auth, adminGuard, getUser)
.delete(auth, adminGuard, deleteUser);

// login endpoint
router.route('/login').post(loginUser);

// register endpoint
router.route('/register').post(registerUser);

module.exports = router;
