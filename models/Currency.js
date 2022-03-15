const mongoose = require('mongoose');

// defining schema
const CurrencySchema = new mongoose.Schema({
    name: {
        type: String
    },
    symbol: {
        type: String
    }
});

module.exports = mongoose.model('Subscription', CurrencySchema);
