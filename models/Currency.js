const mongoose = require('mongoose');

// defining schema
const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String
    },
    symbol: {
        type: String
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
