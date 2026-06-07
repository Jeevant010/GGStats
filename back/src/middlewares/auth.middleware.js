const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid or missing authorization header" });
    }
    
    const token = authHeader.substring(7);
    if (!token) {
        return res.status(401).json({ message: "Invalid or missing authorization header" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid/expired token" });
    }
};

module.exports = verifyToken;
