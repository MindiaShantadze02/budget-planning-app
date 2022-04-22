const express = require('express');

const router = express.Router();

// importing controllers
const {
    createTransaction,
    getTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getAllTransactions,
 } = require('../controllers/transactionController');

// auth middleware
const auth = require('../middleware/auth');

// getting all transactions
router.get('/', auth, getAllTransactions);

// getting account transactions and creating a transaction
router.route('/:accountId')
    .get(auth, getTransactions)
    .post(auth, createTransaction);

// getting deleting and writing transactions
router.route('/transaction/:transactionId')
    .get(auth, getTransaction)
    .put(auth, updateTransaction)
    .delete(auth, deleteTransaction);

module.exports = router;
