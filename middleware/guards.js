const asyncWrapper = require('../utils/asyncWrapper');

// user model
const User = require('../models/User');

// guarding an endpoint so only admin can access it
const adminGuard = asyncWrapper(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id });

    if (user && user.role.toLowerCase() === 'admin') {
        next();
    } else {
        res.status(403).json('Unauthorized');
    }
});

module.exports = {
    adminGuard
};
