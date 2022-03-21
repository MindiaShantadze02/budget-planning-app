const express = require('express');

const router = express.Router();

// importing controllers
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
} = require('../controllers/categoryController');

// auth middleware
const auth = require('../middleware/auth');

// endpoint for categories
router.route('/')
    .get(auth, getCategories)
    .post(auth, createCategory);

// endpoint for one category
router.route('/:id')
    .get(auth, getCategory)
    .put(auth, updateCategory)
    .delete(auth, deleteCategory);

module.exports = router;
