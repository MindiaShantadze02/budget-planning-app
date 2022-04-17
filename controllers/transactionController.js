// importing utils
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Transaction = require('../models/Transaction');

// GET /transactions
// PRIVATE
// for getting all transactions
exports.getAllTransactions = asyncWrapper(async (req, res, next) => {
    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }

    const transactions = await Transaction.find({}).sort({
        createdAt: -1
    });

    res.status(200).json(transactions);
});

// GET /transactions/:accountId
// PRIVATE
// for getting account transactions
exports.getTransactions = asyncWrapper(async (req, res, next) => {
    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }

    const transactions = await Transaction.find({
        user: req.user.id,
        account: req.params.accountId
    }).sort({
        createdAt: -1
    });

    res.status(200).json(transactions);
});

// POST /transactions/:accountId
// PRIVATE
// for creating a transaction
exports.createTransaction = asyncWrapper(async (req, res, next) => {
    const transaction = await Transaction.create({
        account: req.params.accountId,
        user: req.user.id,
        ...req.body
    });
    res.status(201).json(transaction);
});

// POST /transactions/:accountId/:transactionId
// PRIVATE
// for getting a transaction
exports.getTransaction = asyncWrapper(async (req, res, next) => {
    const transaction = await Transaction.findOne({
        _id: req.params.transactionId,
        account: req.params.accountId
    });

    if (req.user.id !== transaction.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    res.status(200).json(transaction);
});

// POST /transactions/:accountId/:transactionId
// PRIVATE
// for updating a transaction
exports.updateTransaction = asyncWrapper(async (req, res, next) => {
    const transaction = await Transaction.findOne({
        _id: req.params.transactionId,
        account: req.params.accountId
    });

    if (req.user.id !== transaction.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await Transaction.findByIdAndUpdate(req.params.transactionId, req.body);

    res.status(201).json('Transaction updated successfully');
});

// DELETE /transactions/:accountId/:transactionId
// PRIVATE
// for deleting a transaction
exports.deleteTransaction = asyncWrapper(async (req, res, next) => {
    const transaction = await Transaction.findOne({
        _id: req.params.transactionId,
        account: req.params.accountId
    });

    if (req.user.id !== transaction.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await Transaction.findByIdAndUpdate(req.params.transactionId);

    res.status(201).json('Transaction deleted successfully');
});
