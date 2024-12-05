const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error.js");

const verifyToken = (req, res, next) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return next(createError(401, "You are not authenticated! 3"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized! 4"));
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized! 5"));
        }
    });
};

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
    // checkRole
};
