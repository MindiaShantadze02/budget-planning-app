const express = require('express');

const router = express.Router();

// importing controllers
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');

// endpoint for categories
router.route('/')
    .get(getCategories)
    .post(createCategory);

// endpoint for one category
router.route('/:id')
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;
