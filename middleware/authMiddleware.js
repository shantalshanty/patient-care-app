const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.send('No token, access denied');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.send('Invalid token');
    }
};

// Role-based access
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.send('Access forbidden');
        }
        next();
    };
};