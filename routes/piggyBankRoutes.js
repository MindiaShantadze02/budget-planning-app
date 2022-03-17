const express = require('express');

const router = express.Router();

// importing controllers
const {
    getPiggyBanks,
    createPiggyBank,
    getPiggyBank,
    updatePiggyBank,
    deletePiggyBank,
 } = require('../controllers/piggyBankController');

// auth middleware
const auth = require('../middleware/auth');

// getting all transactions and creating a transaction
router.route('/:accountId')
    .get(auth, getPiggyBanks)
    .post(auth, createPiggyBank);

// getting deleting and writing transactions
router.route('/:accountId/:piggyBankId')
    .get(auth, getPiggyBank)
    .put(auth, updatePiggyBank)
    .delete(auth, deletePiggyBank);

module.exports = router;
