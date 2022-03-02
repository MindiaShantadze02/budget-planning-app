const express = require('express');
const router = express.Router();

// importing controllers
const {
    getExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense
} = require('../controllers/expenseController');

// endpoint for expenses
router.route('/')
    .get(getExpenses)
    .post(createExpense);

// endpoint for one expense
router.route('/:id')
    .get(getExpense)
    .put(updateExpense)
    .delete(deleteExpense);

module.exports = router;