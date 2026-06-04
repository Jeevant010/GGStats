const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

function getToken(email , user){
    if (!user || typeof user !== 'object' || !user._id) {
        throw new Error("Invalid user passed to getToken");
    }
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
