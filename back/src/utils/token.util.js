const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

function getToken(email , user){
    if (typeof email !== 'string' || email.trim().length === 0) {
        throw new Error(`Invalid email passed to getToken: expected a non-empty string, but got "${email}" (type: ${typeof email})`);
    }
    if (!user || typeof user !== 'object' || !user._id) {
        throw new Error(`Invalid user passed to getToken: expected a user object with _id, but got: ${user ? JSON.stringify(user) : user}`);
    }
    return jwt.sign(
        {
            id: user._id,
            email: email
        },
        jwtSecret,
        { expiresIn : "7d" }
    );
}

module.exports = { getToken };
