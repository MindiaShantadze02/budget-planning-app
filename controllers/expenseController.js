const asyncWrapper = require('../utils/asyncWrapper');

// function for getting all incomes
exports.getExpenses = asyncWrapper((req, res, next) => {
    res.status(200).json('Getting all expenses');
});

exports.createExpense = asyncWrapper((req, res, next) => {
    res.status(201).json('Creating a new expense');
});

// function for getting a single income
exports.getExpense = asyncWrapper((req, res, next) => {
    res.status(200).json(`Getting expense with id ${req.params.id}`);
});

// function for updating income
exports.updateExpense = asyncWrapper((req, res, next) => {
    res.status(201).json(`Updating expense with id ${req.params.id}`);
});

// function for deleting income
exports.deleteExpense = asyncWrapper((req, res, next) => {
    res.status(201).json(`Deleting expense with id ${req.params.id}`);
});
