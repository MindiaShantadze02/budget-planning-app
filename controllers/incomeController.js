const asyncWrapper = require("../utils/asyncWrapper");

// function for getting all incomes
exports.getIncomes = asyncWrapper((req,res,next) => {
    res.status(200).json('Getting all incomes');
});

exports.createIncome = asyncWrapper((req,res,next) => {
    res.status(201).json('Creating a new income');
});

// function for getting a single income
exports.getIncome = asyncWrapper((req,res,next) => {
    res.status(200).json(`Getting income with id ${req.params.id}`);
});

// function for updating income
exports.updateIncome = asyncWrapper((req,res,next) => {
    res.status(201).json(`Updating income with id ${req.params.id}`);
});

// function for deleting income
exports.deleteIncome = asyncWrapper((req,res,next) => {
    res.status(201).json(`Deleting income with id ${req.params.id}`);
});