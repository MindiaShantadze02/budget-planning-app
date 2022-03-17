const mongoose = require('mongoose');

// defining schema
const PiggyBank = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    account: {
        type: mongoose.model.objectId,
        required: true,
        ref: 'Account'
    },
    title: {
        type: String,
        required: [true, 'PiggyBank title is required'],
        maxlength: [255, 'PiggyBank title must have less than 255 characters'],
        minlength: [3, 'PiggyBank title must have more than 3 characters']
    },
    description: {
        type: String,
        maxlength: [512, 'PiggyBank description must have less than 512 characters'],
        minlength: [10, 'PiggyBank description must have more than 10 characters']
    },
    goal: {
        type: Number
    },
    avaliableAmount: {
        type: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PiggyBank', PiggyBank);
