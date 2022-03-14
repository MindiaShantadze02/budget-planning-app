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

// auth middleware
const auth = require('../middleware/auth');

// getting all transactions and creating a transaction
router.route('/')
    .get(auth, getTransactions)
    .post(auth, createTransaction);

// getting deleting and writing transactions
router.route('/:id')
    .get(auth, getTransaction)
    .put(auth, updateTransaction)
    .delete(auth, deleteTransaction);

module.exports = router;
