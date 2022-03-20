const mongoose = require('mongoose');

const connectDB = async mongoUrl => {
    try { 
        await mongoose.connect(mongoUrl);
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = connectDB;
