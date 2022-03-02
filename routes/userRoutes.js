const express = require('express');
const router = express.Router();

// importing controllers
const { 
    createAccount,
    loginUser,
    getAccount,
    updateAccount,
    deleteAccount
 } = require('../controllers/userControllers');

// login endpoint
router.route('/login').post(loginUser);

// endpoint for accounts
router.route('/accounts').post(createAccount);

// getting deleting and updating a single account
router.route('/accounts/:id')
    .get(getAccount)
    .put(updateAccount)
    .delete(deleteAccount);

module.exports = router;