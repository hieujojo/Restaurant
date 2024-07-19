const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error.js");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    });
};

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token) {
//         return next(createError(401, "You are not authenticated!"));
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) return next(createError(403, "Token is not valid!"));
//         req.user = user;
//         next();
//     });
// };

// const checkRole = (roles) => {
//     return (req, res, next) => {
//       if (roles.includes(req.userRole)) {
//         next();
//       } else {
//         res.status(403).send('You do not have permission to perform this action');
//       }
//     };
//   };

const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return next(err);
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin,
    // checkRole
};
