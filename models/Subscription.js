const mongoose = require('mongoose');

// defining schema
const SubscriptionSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.model.objectId
    },
    title: {
        type: String,
        required: [true, 'Category title is required'],
        max: [255, 'Category title must have less than 255 characters'],
        min: [3, 'Category title must have more than 3 characters']
    },
    description: {
        type: String,
        maxlength: [512, 'Description must have less than 512 characters'],
        minlength: [10, 'Description must have more than 10 characters']
    },
    firstDatOfPayment: {
        type: Date
    },
    lastDayOfPayment: {
        type: Date
    },
    dayOfPayment: {
        type: Date,
    },
    category: {
        type: String,
    },
    currency: {
        type: String
    },
    amount: {
        type: String
    },
    createdAt: {
        type: Date,
        required: true
    },
    updateDate: {
        type: Date
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
