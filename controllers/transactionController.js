// importing utils
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Transaction = require('../models/Transaction');

// GET /transactions/:accountId
// PRIVATE
// for getting all transactions
exports.getTransactions = asyncWrapper(async (req, res, next) => {
    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }

    const transactions = await Transaction.find({
        user: req.user.id,
        account: req.params.accountId
    });

    res.status(200).json({
        success: true,
        data: transactions
    });
});

// POST /transactions/:accountId
// PRIVATE
// for creating a transaction
exports.createTransaction = asyncWrapper(async (req, res, next) => {
    await Transaction.create({
        account: req.params.accountId,
        user: req.user.id,
        ...req.body
    });

    res.status(201).json({
        success: true,
        message: 'Transaction created successfully'
    });
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

    res.status(200).json({
        success: true,
        data: transaction
    });
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

    res.status(201).json({
        success: true,
        message: 'Transaction updated successfully'
    });
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

    res.status(201).json({
        success: true,
        message: 'Transaction deleted successfully'
    });
});
