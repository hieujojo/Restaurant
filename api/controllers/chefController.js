const User = require("../models/chef.js");
const multer = require('multer');
const path = require('path');
const Dish = require("../models/dish.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


const createChef = async (req, res, next) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                return next(err);
            }
            const newUser = new User({
                ...req.body,
                image: req.file ? `uploads/${req.file.filename}` : null, 
            });
            await newUser.save();
            res.status(200).json(newUser);
        });
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                return next(err);
            }
            const updateData = { ...req.body};
            if (req.file) {
                const filePath = req.file.path.replace(/\\/g, '/');
                updateData.image = filePath;            
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
const getDishesByChefId = async (req, res, next) => {
    try {
        const chefId = req.params.chefId;
        const dishes = await Dish.find({ chef: chefId });
        res.status(200).json(dishes);
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

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers,
    getUserByName,
    getDishesByChefId,
    createChef
};
