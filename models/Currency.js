const mongoose = require('mongoose');

// defining schema
const CurrencySchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Dollar'
    },
    symbol: {
        type: String,
        default: '$'
    }
});

module.exports = mongoose.model('Subscription', CurrencySchema);
