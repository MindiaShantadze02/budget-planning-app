const users = [];

// hashing password
const bcrypt = require('bcrypt');

// function for registering users
const register = (user) => {
    users.push({
        id: Math.random(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: bcrypt.hashSync(user.password, 10),
        role: user.role,
        gender: user.gender,
        birthDate: user.birthDate,
        country: user.country
    });
};

module.exports = { register, users };
