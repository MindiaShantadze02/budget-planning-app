const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Piggybank = require('../models/Piggybank');

// function for getting all piggybanks
exports.getPiggybanks = asyncWrapper(async (req, res, next) => {
    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }
    const piggyBanks = await Piggybank.find({
        user: req.user.id,
        account: req.params.accountId
    }) || [];

    res.status(200).json({
        success: true,
        count: piggyBanks.length,
        message: piggyBanks
    });
});

// function for creating a piggybank
exports.createPiggybank = asyncWrapper(async (req, res, next) => {
    await Piggybank.create({
        account: req.params.accountId,
        user: req.user.id,
        ...req.body
    });

    res.status(201).json({
        success: true,
        message: 'Piggybank created successfully'
    });
});

// function for getting a piggybank
exports.getPiggybank = asyncWrapper(async (req, res, next) => {
    const piggyBank = await Piggybank.findOne({
        _id: req.params.piggyBankId,
        account: req.params.accountId
    });

    if (req.user.id !== piggyBank.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    res.status(200).json({
        success: true,
        data: piggyBank
    });
});

// function for updating piggybank
exports.updatePiggybank = asyncWrapper(async (req, res, next) => {
    const piggyBank = await Piggybank.findOne({
        _id: req.params.piggyBankId,
        account: req.params.accountId
    });

    if (req.user.id !== piggyBank.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await Piggybank.findByIdAndUpdate(req.params.piggyBankId, req.body);

    res.status(201).json({
        success: true,
        message: 'Piggybank updated successfully'
    });
});

// function for deleting piggybank
exports.deletePiggybank = asyncWrapper(async (req, res, next) => {
    const piggyBank = await Piggybank.findOne({
        _id: req.params.piggyBankId,
        account: req.params.accountId
    });

    if (req.user.id !== piggyBank.user.toString()) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    await Piggybank.findByIdAndUpdate(req.params.piggyBankId);

    res.status(201).json({
        success: true,
        message: 'Piggybank deleted successfully'
    });
});
