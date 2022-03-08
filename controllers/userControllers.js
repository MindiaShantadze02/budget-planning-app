const asyncWrapper = require('../utils/asyncWrapper');

// importing register function
const { register, users } = require('../data/users');

// Login controller
exports.loginUser = asyncWrapper((req, res, next) => {
    res.json('Login Endpoint POST');
});

exports.registerUser = asyncWrapper((req, res, next) => {
    // getting needed fields for users
    const {
        email,
        firstName,
        lastName,
        password,
        role,
        gender,
        birthDate,
        country
    } = req.body;
    register({
        email,
        firstName,
        lastName,
        password,
        role,
        gender,
        birthDate,
        country
    });
    res.json({ message: 'success', data: users });
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
