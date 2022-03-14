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

// getting all transactions and creating a transaction
router.route('/')
    .get(getTransactions)
    .post(createTransaction);

// getting deleting and writing transactions
router.route('/:id')
    .get(getTransaction)
    .put(updateTransaction)
    .delete(deleteTransaction);

module.exports = router;
