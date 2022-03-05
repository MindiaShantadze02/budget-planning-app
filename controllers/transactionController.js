const asyncWrapper = require('../utils/asyncWrapper');

// function for getting all transactions
exports.getTransactions = asyncWrapper(async (req, res, next) => {
    res.status(200).json('Getting all transactions');
});

// function for creating a transaction
exports.createTransaction = asyncWrapper(async (req, res, next) => {
    res.status(201).json('Creating a new transaction');
});

// function for getting a single transaction
exports.getTransaction = asyncWrapper(async (req, res, next) => {
    res.status(200).json(`Getting transaction with id ${req.params.id}`);
});

// function for updating transaction
exports.updateTransaction = asyncWrapper(async (req, res, next) => {
    res.status(201).json(`Updating transaction with id ${req.params.id}`);
});

// function for deleting transaction
exports.deleteTransaction = asyncWrapper(async (req, res, next) => {
    res.status(201).json(`Deleting transaction with id ${req.params.id}`);
});
