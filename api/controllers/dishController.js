
const Dish = require('../models/dish');
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });
// //CREATE
// const createDish = async (req, res, next) => {
//     try {
//         upload.array('image')(req, res, async function (err) {
//             if (err) {
//                 return next(err);
//             }     
//             console.log(req.files);     
//             const imagePaths = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];
//             console.log("req",imagePaths)
//             const newDish = new Dish({
//                 ...req.body,
//                 image: imagePaths,
//             });
//             const saveDish = await newDish.save();
//             res.status(200).json(saveDish);

//         });
//     } catch (err) {
//         next(err);
//     }
// }
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// CREATE DISH CONTROLLER
const createDish = async (req, res, next) => {
    upload.array('image')(req, res, async (err) => {
        if (err) return next(err);

        const imagePaths = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];
        try {
            const newDish = new Dish({
                ...req.body,
                image: imagePaths,
            });
            const savedDish = await newDish.save();
            res.status(200).json(savedDish);
        } catch (err) {
            next(err);
        }
    });
};



//GET
const getDish = async (req, res, next) => {
    try {
        console.log("Fetching Dish with ID:", req.params.id);
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }
        res.status(200).json(dish);
    } catch (err) {
        console.error("Error fetching Dish:", err);
        next(err);
    }
}

//GET ALL
const getDishs = async (req, res, next) => {
    try {
        const Users = await Dish.find();
        res.status(200).json(Users)
    } catch (err) {
        next(err);
    }
}
//GET TYPE DiSH
const getTypeDish = async (req, res, next) => {
    try {
        const type = [];
        const Users = await Dish.find();
        Users.map(dish => {
            if (dish.type) {
                type.push(dish.type)
            }
        })
        res.status(200).json(type)
    } catch (err) {
        next(err);
    }
}


//find BY TYPE
const findDishByType = async (req, res, next) => {
    try {
        const type = req.params.type;
        const dishFind = await Dish.find({ type: type });
        res.status(200).json({ success: true, data: dishFind });
    } catch (err) {
        next(err);
    }
};


//UPDATE
const updateDish = async (req, res, next) => {
    console.log("data", req.body)
    try {
        const updatedDish = await Dish.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedDish);
    } catch (err) {
        res.status(500).json({ err });
    }
}

//DELETE
const deleteDish = async (req, res, next) => {
    try {
        await Dish.findByIdAndDelete(req.params.id);
        res.status(200).json("Dish has been deleted.");
    } catch (err) {
        next(err);
    }
}


const findDishByName = async (req, res, next) => {
    try {
        const dishes = await Dish.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.status(200).json(dishes);
    } catch (err){
        next(err);
    }
};


module.exports = {
    createDish,
    getDish,
    getDishs,
    findDishByType,
    updateDish,
    deleteDish,
    getTypeDish,
    findDishByName
}
