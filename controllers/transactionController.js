// importing utils
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

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
    const queryObj = { ...req.query };
    const excludedFields = ['sort'];
    excludedFields.forEach(field => delete queryObj[field]);

    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }

    let query = Transaction.find({
        user: req.user.id,
        account: req.params.accountId
    });

    if (req.query.sort) {
        query = query.sort(req.query.sort);
    }

    const transactions = await query;

    res.status(200).json(transactions);
});

// POST /transactions/:accountId
// PRIVATE
// for creating a transaction
exports.createTransaction = asyncWrapper(async (req, res, next) => {
    if (!req.params.accountId) {
        res.status(404);
        throw new Error('Please select an account');
    }

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
    const transaction = await Transaction.findById(req.params.transactionId);

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
    const transaction = await Transaction.findById(req.params.transactionId);

    if (req.user.id !== transaction.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.transactionId,
        req.body
    );

    res.status(201).json(updatedTransaction);
});

// DELETE /transactions/:accountId/:transactionId
// PRIVATE
// for deleting a transaction
exports.deleteTransaction = asyncWrapper(async (req, res, next) => {
    const transaction = await Transaction.findById(req.params.transactionId);

    if (req.user.id !== transaction.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await Transaction.findByIdAndDelete(req.params.transactionId);

    res.status(201).json('Transaction deleted successfully');
});
