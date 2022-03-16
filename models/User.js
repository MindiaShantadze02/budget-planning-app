const mongoose = require('mongoose');

// defining schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        maxlength: 255,
        minlength: 7,
        required: [true, 'Please add your email']
    },
    password: {
        type: String,
        maxlength: 255,
        minlength: 10,
        required: [true, 'Please add your password']
    },
    role: {
        type: String,
        enum: ['Admin', 'User']
    },
    firstName: {
        type: String,
        required: [true, 'Please add your firstname'],
        maxlength: 255,
        minlength: 2
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your lastname'],
        maxlength: 255,
        minlength: 2
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
        type: 'String',
        required: [true, 'Please enter country of residence']
    }
}, {
    timestamps: true
});

// defining and exporting user schema
const User = mongoose.model('User', UserSchema);
module.exports = User;
