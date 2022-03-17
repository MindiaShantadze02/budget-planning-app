const asyncWrapper = require('../utils/asyncWrapper');

// importing account model
const Account = require('../models/Account');

// function for getting a single accounts
exports.getAccounts = asyncWrapper(async (req, res, next) => {
    const accounts = await Account.find({ user: req.user.id }) || [];

    res.status(200).json({
        status: 'success',
        data: accounts
    });
});

// function for creating an account
exports.createAccount = asyncWrapper(async (req, res, next) => {
    const {
        title,
        description,
        currency,
        availableAmount
    } = req.body;
    
    await Account.create({
        user: req.user.id,
        title,
        description,
        currency,
        availableAmount
    });

    res.status(201).json({
        status: 'success',
        message: 'Account created successfully'
    });
});

// function for getting a single account
exports.getAccount = asyncWrapper(async (req, res, next) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        res.status(400);
        throw new Error('Account not found');
    }

    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found');
    }

    if (account.user.toString() !== req.user.id) {
        res.status(400);
        throw new Error('Unauthorized');
    }

    res.status(200).json({
        status: 'success',
        data: account
    });
});

// function for updating an account
exports.updateAccount = asyncWrapper(async (req, res, next) => {
    const account = await Account.findById(req.params.id);

    if (!account) {
        res.status(400);
        throw new Error('Account not found');
    }

    if (!req.user) {
        res.status(400);
        throw new Error('User Not Found');
    }

    if (account.user.toString() !== req.user.id) {
        res.status(400);
        throw new Error('Unauthorized');
    }

    await Account.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
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

    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }

    if (account.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await account.remove();

    res.status(200).json({
        status: 'success',
        message: 'Account deleted successfully'
    });
});
