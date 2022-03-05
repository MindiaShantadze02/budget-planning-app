const express = require('express');

const router = express.Router();

// importing controllers
const {
    createTransaction,
    getTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
 } = require('../controllers/transactionController');

router.route('/')
    .get(getTransactions)
    .post(createTransaction);

// getting deleting and writing transactions
router.route('/:id')
    .get(getTransaction)
    .put(updateTransaction)
    .delete(deleteTransaction);

module.exports = router;
