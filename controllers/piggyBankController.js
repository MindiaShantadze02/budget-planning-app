// importing utils
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Piggybank = require('../models/Piggybank');

// GET /piggybanks/:accountId
// PRIVATE
// for getting all piggybanks
exports.getPiggybanks = asyncWrapper(async (req, res, next) => {
    if (!req.user) {
        res.status(400);
        throw new Error('User not found');
    }
    const piggyBanks = await Piggybank.find({
        user: req.user.id,
        account: req.params.accountId
    }) || [];

    res.status(200).json(piggyBanks);
});

// POST /piggybanks/:accountId
// PRIVATE
// for creating a piggybank
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

// GET /piggybanks/:accountId/:piggyBankId
// PRIVATE
// for getting a single piggybank
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

// PUT /piggybanks/:accountId/:piggyBankId
// PRIVATE
// for updating a piggybank
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

// DELETE /piggybanks/:accountId/:piggyBankId\
// PRIVATE
// for deleting a piggybank
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
