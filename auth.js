const jwt = require("jsonwebtoken");
const config = require('config');

// 
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    try {
        const { auth } = jwt.verify(token, config.get('jwtKey'));

        req.auth = auth;
        next();
    } catch (ex) {
        console.log('Invalid token');
        res.status(400).send("invalid token.");    
    }
};


module.exports = auth;