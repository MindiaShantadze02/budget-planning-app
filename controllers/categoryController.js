const asyncWrapper = require("../utils/asyncWrapper");

// function for getting all incomes
exports.getCategories = asyncWrapper((req,res,next) => {
    res.status(200).json('Getting all categories');
});

exports.createCategory = asyncWrapper((req,res,next) => {
    res.status(201).json('Creating a new category');
});

// function for updating income
exports.updateCategory = asyncWrapper((req,res,next) => {
    res.status(201).json(`Updating category with id ${req.params.id}`);
});

// function for deleting income
exports.deleteCategory = asyncWrapper((req,res,next) => {
    res.status(201).json(`Deleting category with id ${req.params.id}`);
});