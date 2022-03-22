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
        role,
        gender,
        birthDate,
        country
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(401).json({
            success: false,
            message: 'User already exists'
        });
        return;
    }

    // creating user
    await User.create({
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
        success: true,
        message: 'User created successfully'
    });
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
                id: user.id
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).json({
            token
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'User not found'
        });
    }
});

// function for getting users
exports.getUsers = asyncWrapper(async (req, res, next) => {
    const users = await User.find({}) || [];
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

// function for getting users
exports.getUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        success: true,
        data: user
    });
});

// function for deleting user
exports.deleteUser = asyncWrapper(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    await Account.deleteMany({ user: req.params.id });
    await Transaction.deleteMany({ user: req.params.id });
    await Piggybank.deleteMany({ user: req.params.id });

    res.status(201).json({
        success: true,
        message: 'User deleted successfully'
    });
});
