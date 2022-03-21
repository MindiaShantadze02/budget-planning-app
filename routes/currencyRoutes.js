const express = require('express');

const router = express.Router();

// importing controllers
const {
    getCurrencies,
    createCurrency,
    updateCurrency,
    deleteCurrency,
    getCurrency
} = require('../controllers/currencyController');

// auth middleware
const auth = require('../middleware/auth');
const { adminGuard } = require('../middleware/guards');

// endpoint for currencies
router.route('/')
    .get(getCurrencies)
    .post(auth, adminGuard, createCurrency);

// endpoint for one currency
router.route('/:id')
    .get(getCurrency)
    .put(auth, adminGuard, updateCurrency)
    .delete(auth, adminGuard, deleteCurrency);

module.exports = router;
