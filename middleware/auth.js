// importing dependencies
const jwt = require('jsonwebtoken');

const asyncWrapper = require('../utils/asyncWrapper');

// user model
const User = require('../models/User');

const auth = asyncWrapper(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // getting token from req.authorization
            token = req.headers.authorization.split(' ')[1];
            // decoding jwt hash
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // getting logged in user
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (err) {
            res.status(401);
            throw new Error('Unauthorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Unauthorized, no token');
    }
});

module.exports = auth;
