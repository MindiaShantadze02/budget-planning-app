// importing utils
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Piggybank = require('../models/Piggybank');

// GET /accounts
// PRIVATE
// for getting user accounts
exports.getAccounts = asyncWrapper(async (req, res, next) => {
    const accounts = await Account.find({ user: req.user.id }).sort({
        createdAt: -1
    }) || [];

    res.status(200).json({
        success: true,
        count: accounts.length,
        data: accounts
    });
});

// POST /accounts
// PRIVATE
// for creating an account for user
exports.createAccount = asyncWrapper(async (req, res, next) => {
    const {
        title,
        description,
        currency,
        isDefault
    } = req.body;
    
    const defualtAccount = await Account.findOne({ isDefault: true });

    if (req.body.isDefault && defualtAccount) {
        await Account.updateMany({ isDefault: false });
    }

    const newAccount = await Account.create({
        user: req.user.id,
        title,
        description,
        currency,
        isDefault
    });

    res.status(201).json({
        success: true,
        message: 'Account created successfully',
        account: newAccount
    });
});

// GET /accounts/:id
// PRIVATE
// for getting a single account
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

// PUT /accounts/:id
// PRIVATE
// for updating an account
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

// DELETE /accounts/:id
// PRIVATE
// for deleting an account
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
    await Piggybank.deleteMany({ account });

    res.status(200).json({
        success: true,
        message: 'Account deleted successfully'
    });
});

// GET /accounts/:id/available-amount
// PRIVATE
// for getting sum of all transactions of current account
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
