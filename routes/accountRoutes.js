const express = require('express');

const router = express.Router();

const {
    getAccounts,
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount
 } = require('../controllers/accountController');

router.route('/')
    .get(getAccounts)
    .post(createAccount);

// getting deleting and updating a single account
router.route('/:id')
    .get(getAccount)
    .put(updateAccount)
    .delete(deleteAccount);

module.exports = router;
