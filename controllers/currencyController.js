// importing utils
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Currency = require('../models/Currency');

// GET /currencies
// PUBLIC
// for getting all available currencies
exports.getCurrencies = asyncWrapper(async (req, res, next) => {
    const currencies = await Currency.find({});

    res.status(200).json({
        success: true,
        count: currencies.length,
        data: currencies
    });
});

// POST /currencies
// PRIVATE admin
// for creating a currency
exports.createCurrency = asyncWrapper(async (req, res, next) => {
    await Currency.create(req.body);

    res.status(201).json({
        success: true,
        message: 'Currency added successfully'
    });
});

// GET /currencies/:id
// PUBLIC
// for getting a single currency
exports.getCurrency = asyncWrapper(async (req, res, next) => {
    const currency = await Currency.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: currency
    });
});

// GET /currencies
// PRIVATE admin
// for updating a currency
exports.updateCurrency = asyncWrapper(async (req, res, next) => {
    await Currency.findByIdAndUpdate(req.params.id, req.body);

    res.status(201).json({
        success: true,
        message: 'Currency updated successfully'
    });
});

// DELETE /currencies/:id
// PRIVATE admin
// for deleting a currency
exports.deleteCurrency = asyncWrapper(async (req, res, next) => {
    await Currency.findByIdAndDelete(req.params.id);

    res.status(201).json({
        success: true,
        message: 'Currency deleted successfully'
    });
});
