const { users } = require('../data/users');

// guarding an endpoint so only admin can access it
const adminGuard = (req, res, next) => {
    const user = users.find(user => user.email === req.user.email);

    if (user && user.role.toLowerCase() === 'admin') {
        next();
    } else {
        res.status(403).json('Unauthorized');
    }
};

module.exports = {
    adminGuard
};
