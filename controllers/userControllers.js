// importing dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// importing async wrapper
const asyncWrapper = require('../utils/asyncWrapper');

// importing user model
const User = require('../models/User');

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
            status: 'fail',
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
        status: 'success',
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
                id: user.id,
                firstName: user.firstName
            },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(201).json({
            token: `Bearer ${token}`
        });
    } else {
        res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }
});

// function for getting users
exports.getUsers = asyncWrapper(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        status: 'success',
        data: users
    });
});

// function for getting users
exports.getUser = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: user
    });
});

// function for deleting user
exports.deleteUser = asyncWrapper(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
});
