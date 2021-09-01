//To verify the jwt that comes in from the client and auth. the users
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {     
    //next is a callback we have to run so that it moves on to the next piece of middleware

    // Get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        req.admin = decoded.admin;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not found' });
    }
}