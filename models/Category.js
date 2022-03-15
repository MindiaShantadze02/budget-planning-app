const mongoose = require('mongoose');

// defining schema
const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Category title is required'],
        max: [255, 'Category title must have less than 255 characters'],
        min: [3, 'Category title must have more than 3 characters']
    },
    categoryType: {
        type: String,
        required: true,
        enum: ['Income', 'Expense']
    }
});

module.exports = mongoose.model('Category', CategorySchema);
