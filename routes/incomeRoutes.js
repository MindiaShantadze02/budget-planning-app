const express = require('express');
const router = express.Router();

// importing controllers
const {
    getIncomes,
    getIncome,
    createIncome,
    updateIncome,
    deleteIncome
} = require('../controllers/incomeController');

// endpoint for incomes
router.route('/')
    .get(getIncomes)
    .post(createIncome);

// endpoint for one income
router.route('/:id')
    .get(getIncome)
    .put(updateIncome)
    .delete(deleteIncome);

module.exports = router;