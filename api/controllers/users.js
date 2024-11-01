const User = require("../models/User.js");
const multer = require('multer');
const path = require('path');
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất
    }
});
const upload = multer({ storage: storage });
const updateUser = async (req, res, next) => {
    try {
        upload.single('img')(req, res, async function (err) {
            if (err) {
                return next(err);
            }
            const updateData = { ...req.body};
            if (req.file) {
                const filePath = req.file.path.replace(/\\/g, '/');
                updateData.img = filePath;            
            }
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: updateData },
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).json("User not found.");
            }

            res.json(updatedUser);
        });
    } catch (error) {
        next(error);
    }
};



const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
const getUserByName = async (req, res, next) => {
    try {
        const users = await User.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.status(200).json(users);
    } catch (err){
        next(err);
    }
};
const getUserProfile = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token || req.headers.authorization.split(" ")[1];
        if (!token) return next(createError(401, "You are not authenticated!"));
        const decoded = jwt.verify(token, process.env.JWT);
                const user = await User.findById(decoded.id).select("-password"); 
        if (!user) return next(createError(404, "User not found!"));
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    getUserByName,
    getUserProfile
};
