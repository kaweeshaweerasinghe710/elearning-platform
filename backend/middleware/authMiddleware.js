const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes and ensure the user is authenticated
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next(); 
            
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed or expired' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// Middleware to check if the user is an instructor
const instructor = (req, res, next) => {
    if (req.user && req.user.role === 'instructor') {
        next(); 
    } else {
        res.status(403).json({ message: 'Access denied: You are not an instructor' });
    }
};

const student = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        next(); 
    } else {
        res.status(403).json({ message: 'Access denied: Only students can do this' });
    }
};

module.exports = { protect, instructor };