const mongoose = require('mongoose');

// defining schema
const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.model.objectId
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
    currency: {
        type: String
    },
    availableAmount: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updateDate: {
        type: Date
    }
});

module.exports = mongoose.model('Account', AccountSchema);
