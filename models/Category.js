// importing dependencies
const mongoose = require('mongoose');

// defining schema
const CategorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Category title is required'],
        max: [255, 'Category title must have less than 255 characters'],
        min: [3, 'Category title must have more than 3 characters']
    },
    categoryType: {
        type: String,
        required: [true, 'Category type is required'],
        enum: ['Income', 'Expense']
    }
}, {
    timestamps: true
});

// exporting model
module.exports = mongoose.model('Category', CategorySchema);
