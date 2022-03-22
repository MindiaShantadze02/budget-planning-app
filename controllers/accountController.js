const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// function for getting a single accounts
exports.getAccounts = asyncWrapper(async (req, res, next) => {
    const accounts = await Account.find({ user: req.user.id }) || [];

    res.status(200).json({
        success: true,
        count: accounts.length,
        data: accounts
    });
});

// function for creating an account
exports.createAccount = asyncWrapper(async (req, res, next) => {
    const {
        title,
        description,
        currency
    } = req.body;
    
    await Account.create({
        user: req.user.id,
        title,
        description,
        currency
    });

    res.status(201).json({
        success: true,
        message: 'Account created successfully'
    });
});

// function for getting a single account
exports.getAccount = asyncWrapper(async (req, res, next) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        res.status(404);
        throw new Error('Account not found');
    }

    if (account.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    res.status(200).json({
        success: true,
        data: account
    });
});

// function for updating an account
exports.updateAccount = asyncWrapper(async (req, res, next) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        res.status(404);
        throw new Error('Account not found');
    }

    if (account.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await Account.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        success: true,
        message: 'Account Updated Successfully'
    });
});

// function for deleting an account
exports.deleteAccount = asyncWrapper(async (req, res, next) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        res.status(400);
        throw new Error('Account not found');
    }

    if (account.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await Account.findByIdAndDelete(req.params.id);
    await Transaction.deleteMany({ account: req.params.id });

    res.status(200).json({
        success: true,
        message: 'Account deleted successfully'
    });
});

exports.getAvailableAmount = async (req, res, next) => {
    const account = await Account.findById(req.params.id);
    
    if (!account) {
        res.status(400);
        throw new Error('Account not found');
    }

    if (account.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Unauthorized');
    }
    const transactions = await Transaction.find({ account: req.params.id });
    const availableAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

    res.status(200).json({
        success: true,
        data: availableAmount
    });
};
