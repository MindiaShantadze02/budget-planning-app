const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Currency = require('../models/Currency');

// function for getting a single currencies
exports.getCurrencies = asyncWrapper(async (req, res, next) => {
    const currencies = await Currency.find({});

    res.status(200).json({
        success: true,
        count: currencies.length,
        data: currencies
    });
});

// function for creating an currency
exports.createCurrency = asyncWrapper(async (req, res, next) => {
    await Currency.create(req.body);

    res.status(201).json({
        success: true,
        message: 'Currency added successfully'
    });
});

// function for getting a single currency
exports.getCurrency = asyncWrapper(async (req, res, next) => {
    const currency = await Currency.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: currency
    });
});

// function for updating an currency
exports.updateCurrency = asyncWrapper(async (req, res, next) => {
    await Currency.findByIdAndUpdate(req.params.id, req.body);

    res.status(201).json({
        success: true,
        message: 'Currency updated successfully'
    });
});

// function for deleting an currency
exports.deleteCurrency = asyncWrapper(async (req, res, next) => {
    await Currency.findByIdAndDelete(req.params.id);

    res.status(201).json({
        success: true,
        message: 'Currency deleted successfully'
    });
});
