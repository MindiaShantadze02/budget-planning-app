// importing dependencies
const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;

// user model
const User = require('../models/User');

// options for JWT Strategy
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

// callback for Jwt Strategy
const jwtCallback = async (jwtPayload, done) => {
    const user = await User.findOne({ _id: jwtPayload.id });

    if (user) {
        return done(null, user);
    }

    return done(null, false);
};

// defining jwt strategy
passport.use(new JwtStrategy(opts, jwtCallback));

// defining authentication middleware for protected routes
const auth = passport.authenticate('jwt', { session: false });

module.exports = auth;
