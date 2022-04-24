// importing dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing utils
const asyncWrapper = require('../utils/asyncWrapper');

// importing models
const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');
const Piggybank = require('../models/Piggybank');

// function for registering user
exports.registerUser = asyncWrapper(async (req, res, next) => {
    // getting needed fields for users from request body
    const {
        email,
        firstName,
        lastName,
        password,
        password2,
        role,
        gender,
        birthDate,
        country
    } = req.body;

    const userExists = await User.findOne({ email });

    if (password !== password2) {
        res.status(400);
        throw new Error('Passwords does not match');
    }

    if (userExists) {
        res.status(401);
        throw new Error('User with this email already exists');
    }

    // creating user
    const user = await User.create({
        email,
        firstName,
        lastName,
        password: await bcrypt.hash(password, 10),
        role,
        gender,
        birthDate,
        country
    });
    
    res.json('User created successfully');
});

// function for logging in user
exports.loginUser = asyncWrapper(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            { 
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json(token);
    } else {
        res.status(400);
        throw new Error('Incorrect email or password');
    }
});

// function for getting users
exports.getUsers = asyncWrapper(async (req, res, next) => {
    const users = await User.find({}) || [];

    if (!users && users.length === 0) {
        res.status(404);
        throw new Error('Users list is empty');
    }

    res.status(200).json(users);
});

// function for getting users
exports.getUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    
    res.status(200).json(user);
});

// function for deleting user
exports.deleteUser = asyncWrapper(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    await Account.deleteMany({ user: req.params.id });
    await Transaction.deleteMany({ user: req.params.id });
    await Piggybank.deleteMany({ user: req.params.id });

    res.status(201).json('User deleted successfully');
});

exports.getMe = asyncWrapper(async (req, res, next) => {
    res.status(200).json(req.user);
});
