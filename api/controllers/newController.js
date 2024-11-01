const New = require('../models/new');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Tạo tên file duy nhất
    }
});
const upload = multer({ storage: storage });
const createNew = async (req, res, next) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                return next(err);
            }
            const slugchange = createSlug(req.body.title);
            const newNew = new New({
                ...req.body,
                slug: slugchange,
                type: req.type ? req.type : 'news',
                image: req.file ? `uploads/${req.file.filename}` : null, 
            });
            const saveNew = await newNew.save();
            res.status(200).json(saveNew);
        });
    } catch (err) {
        next(err);
    }
}

// GET
const getNew = async (req, res, next) => {
    try {
        console.log("Fetching with ID:", req.params.id);
        const newEntry = await New.findById(req.params.id);
        if (!newEntry) {
            return res.status(404).json({ message: "New not found" });
        }
        res.status(200).json(newEntry);
    } catch (err) {
        console.error("Error fetching New:", err);
        next(err);
    }
}

// GET ALL
const getNews = async (req, res, next) => {
    try {
        const allNews = await New.find();
        res.status(200).json(allNews);
    } catch (err) {
        next(err);
    }
}


const updateNew = async (req, res, next) => {
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
            const updateNew = await New.findByIdAndUpdate(
                req.params.id,
                { $set: updateData},
                { new: true, runValidators: true}
            );

            if (!updateNew) {
                return res.status(404).json("new not found.");
            }

            res.status(200).json(updateNew);
        });
    } catch (error) {
        next(error);
    }
};



//find BY TYPE
const findNewByType = async (req, res, next) => {
    try {
        // Lấy loại món ăn từ tham số URL
        const type = req.params.type;

        // Tìm các món ăn có loại tương ứng
        const newFind = await New.find({ type: type });

        // Trả về kết quả dưới dạng JSON
        res.status(200).json({ success: true, data: newFind });
    } catch (err) {
        // Chuyển lỗi đến middleware xử lý lỗi
        next(err);
    }
};
//find BY Title
const findNewByTitle = async (req, res, next) => {
    try {
        const news = await New.find({ title: { $regex: req.params.title, $options: 'i' } });
        res.status(200).json(news);
    } catch (err){
        next(err);
    }
};


//DELETE
 const deleteNew = async (req,res,next)=>{
    try{
        await New.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("New has been deleted.")
    }catch(err){
        next(err);
    }
}

 module.exports = {
    createNew,
    getNew,
    getNews,
    findNewByType,
    findNewByTitle,
    updateNew,
    deleteNew
}
const createSlug = (title) => {
    if (typeof title !== 'string') {
        throw new TypeError('Title must be a string');
    }

    return title
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};






