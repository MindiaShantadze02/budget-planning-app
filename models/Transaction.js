// importing dependencies
const mongoose = require('mongoose');

// importing models
const Account = require('./Account');

// defining schema
const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    transactionType: {
        type: String,
        enum: ['Income', 'Expense']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [255, 'Title must have less than 255 characters'],
        minlength: [3, 'Title must have more than 3 characters']
    },
    description: {
        type: String,
        maxlength: [512, 'Description must have less than 512 characters'],
        minlength: [10, 'Description must have more than 10 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    currency: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

// defining transaction type depending on amount passed by user
TransactionSchema.pre('save', function () {
    if (this.transactionType === 'Expense' && this.amount > 0) {
        this.amount = 0 - Number(this.amount);
    } else if (this.transactionType === 'Income' && this.amount < 0) {
        this.amount = Math.abs(this.amount);
    }
});

// exporting model
module.exports = mongoose.model('Transaction', TransactionSchema);
