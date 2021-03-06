// importing dependencies
const mongoose = require('mongoose');

// defining schema
const AccountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [255, 'Title must have less than 255 characters'],
        minlength: [3, 'Title must have more than 3 characters'],
        trim: true
    },
    currency: {
        type: Object,
        required: [true, 'Please enter currency']
    },
    description: {
        type: String,
        maxlength: [512, 'Description must have less than 512 characters'],
        minlength: [10, 'Description must have more than 10 characters'],
        trim: true
    }
}, {
    timestamps: true
});

// exporting model
module.exports = mongoose.model('Account', AccountSchema);
