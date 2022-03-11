// importing dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// function for logging in user
exports.loginUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const user = users.find((userItem) => userItem.email === email);
    const isUserLogged = user && bcrypt.compareSync(password, user.password);
    
    if (isUserLogged) {
        const payload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET
            );
    }

    res.status(404).json('User Not Found');
});
