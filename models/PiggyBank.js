const mongoose = require('mongoose');

// defining schema
const PiggybankSchema = new mongoose.Schema({
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
    title: {
        type: String,
        required: [true, 'Piggybank title is required'],
        maxlength: [255, 'Piggybank title must have less than 255 characters'],
        minlength: [3, 'Piggybank title must have more than 3 characters']
    },
    description: {
        type: String,
        maxlength: [512, 'Piggybank description must have less than 512 characters'],
        minlength: [10, 'Piggybank description must have more than 10 characters']
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

module.exports = mongoose.model('Piggybank', PiggybankSchema);
