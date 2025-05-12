const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming your User model is here

const protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        try {
            token = req.cookies.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password'); // Attach user to request, exclude password

            if (!req.user) {
                 // User not found, perhaps deleted after token was issued
                res.clearCookie('token'); // Clear the invalid token
                // For API requests, send 401
                if (req.originalUrl.startsWith('/api')) {
                    return res.status(401).json({ message: 'Not authorized, user not found' });
                }
                // For page requests, redirect to login
                return res.redirect('/');
            }
            next();
        } catch (error) {
            console.error('Token verification failed:', error.message);
             res.clearCookie('token'); // Clear the invalid token
            if (req.originalUrl.startsWith('/api')) {
                return res.status(401).json({ message: 'Not authorized, token failed' });
            }
            return res.redirect('/');
        }
    }

    if (!token) {
        if (req.originalUrl.startsWith('/api')) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }
        return res.redirect('/');
    }
};

module.exports = { protect };