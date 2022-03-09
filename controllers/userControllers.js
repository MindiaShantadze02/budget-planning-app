// importing dependencies
const bcrypt = require('bcrypt');

const asyncWrapper = require('../utils/asyncWrapper');

// importing register function
const { users } = require('../data/users');

exports.registerUser = asyncWrapper(async (req, res, next) => {
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

    if (users.some((userItem) => userItem.email === email)) {
        res.status(400).json('User already exists');
        return;
    }

    users.push({
        id: Math.random(),
        email,
        firstName,
        lastName,
        password: await bcrypt.hash(password, 10),
        role,
        gender,
        birthDate,
        country
    });
    res.json({ message: 'success', data: users });
});

// Login controller
exports.loginUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = users.find((userItem) => userItem.email === email);
    const userExists = user && bcrypt.compareSync(password, user.password);
    if (userExists) {
        res.status(200).json(user);
    }

    res.status(404).json('User Not Found');
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
