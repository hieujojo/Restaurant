const Table = require('../models/table');
const Area = require('../models/area');

// const multer = require('multer');
// const path = require('path');

// // Cấu hình multer để lưu trữ tệp
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Thư mục lưu trữ hình ảnh trên máy chủ
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     }
// });

// const upload = multer({ storage: storage });

// CREATE
const createTable = async (req, res, next) => {
    const newTable = new Table(req.body);

    try {
        const saveTable = await newTable.save();
        res.status(200).json(saveTable);
    } catch (err) {
        next(err);
    }
}
// const uploadMiddleware = upload.array('images', 10);

// const createTable = async (req, res, next) => {
//     // Sử dụng middleware để xử lý tải lên hình ảnh
//     uploadMiddleware(req, res, async (err) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error uploading files' });
//         }

//         // Tạo mảng URL công khai cho hình ảnh
//         const imageUrls = req.files.map(file => {
//             return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
//         });

//         // Tạo đối tượng Table với thông tin từ req.body và URLs của hình ảnh
//         const newTable = new Table({
//             ...req.body,
//             images: imageUrls // Thay đổi đây cho phù hợp với cấu trúc của model Table
//         });

//         try {
//             const saveTable = await newTable.save();
//             res.status(200).json(saveTable);
//         } catch (err) {
//             next(err);
//         }
//     });
// };

// GET
const getTable = async (req, res, next) => {
    try {
        console.log("Fetching with ID:", req.params.id);
        const TableEntry = await Table.findById(req.params.id);
        if (!TableEntry) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.status(200).json(TableEntry);
    } catch (err) {
        console.error("Error fetching Table:", err);
        next(err);
    }
}

// GET ALL
const getTables = async (req, res, next) => {
    try {
        const allTables = await Table.find();
        res.status(200).json(allTables);
    } catch (err) {
        next(err);
    }
}

// UPDATE
const updateTable = async (req, res, next) => {
    try {
        const updateTable = await Table.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json(updateTable);
    } catch (err) {
        res.status(500).json(err);
    }
}

// FIND BY TYPE
const findTableByType = async (req, res, next) => {
    try {
        const type = req.params.type;
        const TableFind = await Table.find({ type: type });
        res.status(200).json({ success: true, data: TableFind });
    } catch (err) {
        next(err);
    }
}

// DELETE
const deleteTable = async (req, res, next) => {
    try {
        await Table.findByIdAndDelete(req.params.id);
        res.status(200).json("Table has been deleted.");
    } catch (err) {
        next(err);
    }
}

const getTypeTable = async (req, res, next) => {
    try {
        const type = [];
        const Users = await Table.find();
        Users.map(Table => {
            if (Table.type) {
                type.push(Table.type)
            }
        })
        res.status(200).json(type)
    } catch (err) {
        next(err);
    }
}


const findTableByName = async (req, res, next) => {
    try {
        const tables = await Table.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.status(200).json(tables);
    } catch (err){
        next(err);
    }
};

const getTableByArea = async (req, res, next) => {
    try {
        const areas = await Area.find();
        
        const areasWithTables = await Promise.all(areas.map(async (area) => {
          const tables = await Table.find({ area: area._id });
          return {
            ...area.toObject(), 
            tables: tables 
          };
        }));
        res.status(200).json(areasWithTables);
      } catch (err) {
        res.status(500).json({ message: 'Đã xảy ra lỗi', error: err.message });
      }
};

module.exports = {
    createTable,
    getTable,
    getTables,
    findTableByType,
    updateTable,
    deleteTable,
    getTypeTable,
    findTableByName,
    getTableByArea
}
