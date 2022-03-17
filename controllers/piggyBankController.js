const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const PiggyBank = require('../models/PiggyBank');

// function for getting all piggybanks
exports.getPiggyBank = asyncWrapper(async (req, res, next) => {
    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }
    const piggyBanks = await PiggyBank.find({
        user: req.user.id,
        account: req.params.accountId
    }) || [];

    res.status(200).json({
        status: 'success',
        message: piggyBanks
    });
});

// function for creating a piggybank
exports.createPiggyBank = asyncWrapper(async (req, res, next) => {
    await PiggyBank.create({
        account: req.params.accountId,
        user: req.user.id,
        ...req.body
    });

    res.status(201).json({
        status: 'success',
        message: 'PiggyBank created successfully'
    });
});

// function for getting a piggybank
exports.getPiggyBank = asyncWrapper(async (req, res, next) => {
    const piggyBank = await PiggyBank.findOne({
        _id: req.params.piggyBankId,
        account: req.params.accountId
    });

    if (req.user.id !== piggyBank.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    res.status(200).json({
        status: 'success',
        data: piggyBank
    });
});

// function for updating piggybank
exports.updatePiggyBank = asyncWrapper(async (req, res, next) => {
    const piggyBank = await PiggyBank.findOne({
        _id: req.params.piggyBankId,
        account: req.params.accountId
    });

    if (req.user.id !== piggyBank.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await PiggyBank.findByIdAndUpdate(req.params.piggyBankId, req.body);

    res.status(201).json({
        status: 'success',
        message: 'PiggyBank updated successfully'
    });
});

// function for deleting piggybank
exports.deletePiggyBank = asyncWrapper(async (req, res, next) => {
    const piggyBank = await PiggyBank.findOne({
        _id: req.params.piggyBankId,
        account: req.params.accountId
    });

    if (req.user.id !== piggyBank.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await PiggyBank.findByIdAndUpdate(req.params.piggyBankId);

    res.status(201).json({
        status: 'success',
        message: 'PiggyBank deleted successfully'
    });
});
