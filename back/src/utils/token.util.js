const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

function getToken(email , user){
    return jwt.sign(
        {
            id: user._id,
            email: email
        },
        jwtSecret,
        { expiresIn : "7d" }
    );
};

module.exports = { getToken };
