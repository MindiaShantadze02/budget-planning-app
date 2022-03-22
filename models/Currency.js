const mongoose = require('mongoose');

// defining schema
const CurrencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Currency name not defined']
    },
    symbol: {
        type: String,
        required: [true, 'Currency symbol is required']
    }
});

module.exports = mongoose.model('Subscription', CurrencySchema);