const jwt = require('jsonwebtoken');

function getToken(email , user){
    return jwt.sign(
        {
            id: user._id,
            email: email
        },
        process.env.TOKEN,
        { expiresIn : "7d" }
    );
};

const verifyToken = (req, res , next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json( { message : "No token provided"});
    
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN , (err, decoded) => {
        if(err) return res.status(403).json({ message : "Invalid token"});
    req.user = decoded;
    next();
    });
};



// ========= Admin =============
// const createAccessToken = payload => 

//     jwt.sign(patload , process.env.)

module.exports = { verifyToken,  getToken };