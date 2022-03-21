const express = require('express');

const router = express.Router();

// importing controllers
const {
    getPiggybanks,
    createPiggybank,
    getPiggybank,
    updatePiggybank,
    deletePiggybank,
 } = require('../controllers/piggyBankController');

// auth middleware
const auth = require('../middleware/auth');

// getting all transactions and creating a transaction
router.route('/:accountId')
    .get(auth, getPiggybanks)
    .post(auth, createPiggybank);

// getting deleting and writing transactions
router.route('/:accountId/:piggyBankId')
    .get(auth, getPiggybank)
    .put(auth, updatePiggybank)
    .delete(auth, deletePiggybank);

module.exports = router;
