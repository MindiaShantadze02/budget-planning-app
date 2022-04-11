// importing dependencies
const mongoose = require('mongoose');

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
        type: Number
    }
}, {
    timestamps: true
});

// defining transaction type depending on amount passed by user
TransactionSchema.pre('save', function () {
    this.transactionType = this.amount > 0 ? 'Income' : 'Expense';
});

// exporting model
module.exports = mongoose.model('Transaction', TransactionSchema);
