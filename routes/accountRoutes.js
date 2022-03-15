const express = require('express');

const router = express.Router();

const {
    getAccounts,
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount
 } = require('../controllers/accountController');

// auth middleware
const auth = require('../middleware/auth');

router.route('/')
    .get(auth, getAccounts)
    .post(auth, createAccount);

// getting deleting and updating a single account
router.route('/:id')
    .get(auth, getAccount)
    .put(auth, updateAccount)
    .delete(auth, deleteAccount);

module.exports = router;
