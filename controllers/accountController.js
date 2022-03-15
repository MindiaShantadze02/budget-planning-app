const asyncWrapper = require('../utils/asyncWrapper');

// function for getting a single accounts
exports.getAccounts = asyncWrapper((req, res, next) => {
    res.status(200).json('getting all accounts');
});

// function for creating an account
exports.createAccount = asyncWrapper((req, res, next) => {
    res.status(201).json('Account created successfully');
});

// function for getting a single account
exports.getAccount = asyncWrapper((req, res, next) => {
    res.status(200).json(`You are visiting an account with id of ${req.params.id}`);
});

// function for updating an account
exports.updateAccount = asyncWrapper((req, res, next) => {
    res.status(201).json(`You are updating an account with id of ${req.params.id}`);
});

// function for deleting an account
exports.deleteAccount = asyncWrapper((req, res, next) => {
    res.status(201).json(`Account with id ${req.params.id} deleted successfully`);
});
