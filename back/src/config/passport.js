const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJWt = require('passport-jwt').ExtractJwt;
const { jwtSecret } = require('./env');
const User = require('../models/user.model');

const configurePassport = () => {
    const opts = {
        jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
        secretOrKey : jwtSecret,
    };

    passport.use('user-jwt' , new JwtStrategy(opts , async (jwt_payload , done) => {
        try {
            const user  = await User.findById(jwt_payload.id);
            if(user) return done(null, user);
            return done(null , false);
        }   catch (err) {
            return done(err, false);
        }
    }));
};

module.exports = configurePassport;
