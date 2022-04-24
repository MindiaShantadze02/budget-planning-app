// importing dependencies
const mongoose = require('mongoose');
const { isEmail } = require('validator');

// defining schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        maxlength: 255,
        minlength: 7,
        trim: true,
        required: [true, 'Please add your email'],
        validate: [isEmail, 'Please enter an valid email']
    },
    password: {
        type: String,
        maxlength: [255, 'Password must be less than 255 characters long'],
        minlength: [10, 'Password must be more than 10 characters long'],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'Password must be Minimum eight characters long,and with at least one letter and one number:'],
        required: [true, 'Please add your password']
    },
    role: {
        type: String,
        enum: ['Admin', 'User']
    },
    firstName: {
        type: String,
        required: [true, 'Please add your firstname'],
        maxlength: [255, 'User name must be less than 255 characters long'],
        minlength: [2, 'User name must be more than 2 characters long'],
        match: [/^[a-zA-Z ]{3,255}$/gi, 'User name should only contain letters and spaces'],
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your lastname'],
        maxlength: [255, 'User lastname must be less than 255 characters long'],
        minlength: [2, 'User name must be more than 2 characters long'],
        match: [/^[a-zA-Z ]{3,255}$/gi, 'User last name should only contain letters and spaces'],
    },
    gender: {
        required: [true, 'Please enter your gender'],
        type: String,
        enum: {
            values: ['Male', 'Female', 'Other'],
        }
    },
    birthDate: {
        type: Date,
        required: [true, 'Please enter your birthday']
    },
    country: {
        type: String,
        required: [true, 'Please enter your country of residence']
    }
}, {
    timestamps: true
});

// exporting model
module.exports = mongoose.model('User', UserSchema);
