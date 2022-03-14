// importing dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing async wrapper
const asyncWrapper = require('../utils/asyncWrapper');

// importing users data
const { users } = require('../data/users');

// function for registering user
exports.registerUser = asyncWrapper(async (req, res, next) => {
    // getting needed fields for users from request body
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

    if (users.find((userItem) => userItem.email === email)) {
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
    res.json({ 
        message: 'success',
        data: 'User registered successfully'
    });
});

// function for logging in user
exports.loginUser = asyncWrapper(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    const user = users.find(user => user.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { email: user.email, id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: `Bearer: ${token}`
        });
    }
});

// function for getting users
exports.getUsers = asyncWrapper(async (req, res, next) => {
    res.status(200).json(users);
});

// function for getting users
exports.getUser = asyncWrapper(async (req, res, next) => {
    const user = users.find(user => user.id === req.params.id);
    res.status(200).json();
});
