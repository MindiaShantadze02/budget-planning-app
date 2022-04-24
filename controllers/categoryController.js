// importing utils
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const Category = require('../models/Category');

// GET /categories
// PRIVATE
// for getting all users categories
exports.getCategories = asyncWrapper(async (req, res, next) => {
    const categories = await Category.find({ user: req.user.id });

    res.status(200).json(categories);
});

// POST /categories
// PRIVATE
// for creating a category
exports.createCategory = asyncWrapper(async (req, res, next) => {
    const {
        title,
        categoryType
    } = req.body;
    
    const categoryExists = await Category.findOne({ user: req.user.id, title });
    
    if (categoryExists) {
        res.status(400);
        throw new Error('Category with this title already exists');
    }

    const category = await Category.create({
        user: req.user.id,
        title,
        categoryType
    });

    res.status(201).json(category);
});

// GET /categories/:id
// PRIVATE
// for getting a single category
exports.getCategory = asyncWrapper(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(400);
        throw new Error('Category not found');
    }

    if (category.user.toString() !== req.user.id) {
         res.status(401);
        throw new Error('Unauthorized');
    }
    
    res.status(200).json(category);
});

// PUT /categories/:id
// PRIVATE
// for updating a category
exports.updateCategory = asyncWrapper(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(400);
        throw new Error('Category not found');
    }

    if (category.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Unauthorized');
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    });

    res.status(200).json(updatedCategory);
});

// DELETE /categories/:id
// PRIVATE
// for deleting a category
exports.deleteCategory = asyncWrapper(async (req, res, next) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        res.status(400);
        throw new Error('Category not found');
    }

    if (category.user.toString() !== req.user.id) {
         res.status(401);
         throw new Error('Unauthorized');
    }

    await category.remove();

    res.status(200).json('Category deleted successfully');
});
