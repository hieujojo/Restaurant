// const { get } = require("http");
// const table = require("../models/table.js");
// const mongoose = require('mongoose');

// const Booking = async (req, res, next) => {
//     try {
//         const newBooking = {
//             ...req.body,
//             _id: new mongoose.Types.ObjectId()
//         };
//         const updatebooking = await table.updateOne(
//             { "_id": req.params.id },
//             {
//                 $push: {
//                     "booking": newBooking
//                 },
//             }
//         );
//         res.status(200).json(updatebooking);
//     } catch (err) {
//         next(err);
//     }
// };

// const deleteBooking = async (req, res, next) => {
//     try {
//         await table.updateOne(
//             { "booking._id": new mongoose.Types.ObjectId(req.params.idBooking) },
//             {
//                 $pull: {
//                     "booking": { _id: new mongoose.Types.ObjectId(req.params.idBooking) }
//                 }
//             }
//         );
//         res.status(200).json("Booking has been deleted.");
//     } catch (err) {
//         console.error("Cancel delete", err);
//         next(err);
//     }
// };

// const updateBooking = async (req, res, next) => {
//     try {
//         const filter = { "booking._id": new mongoose.Types.ObjectId(req.params.idBooking) };

//         const update = {};
//         for (const key in req.body) {
//             update[`booking.$.${key}`] = req.body[key];
//         }
//         await table.updateOne(filter, { $set: update });

//         res.status(200).json("Booking has been updated.");
//     } catch (err) {
//         console.error("Error updating booking", err);
//         next(err);
//     }
// };

//   const getBooking = async (req, res, next) => {
//     try {
//       const userId  = req.params.idUser;

//       if (!userId) {
//         return res.status(400).json({ message: "Invalid user ID" });
//       }
  
//       const bookings = await table.find({ "booking.user": userId }).exec();
//       if (!bookings || bookings.length === 0) {
//         return res.status(404).json({ message: "No bookings found for this user" });
//       } 
//       res.status(200).json(bookings);
//     } catch (err) {
//       console.error("Error getting booking by user:", err);
//       next(err);
//     }
//   };

//   const getBookings = async (req, res, next) => {
//     try {
//         const tables = await table.find();
//         const bookings = tables.flatMap(table => table.booking);
//         res.status(200).json(bookings);
//     } catch (err) {
//         next(err);
//     }
// };
// const getBookingByType = async (req, res, next) => {
//     try {
//         const tables = await table.find();
//         const bookings = tables.flatMap(table => table.booking);
//         const type = req.params.type;
//         const filteredBookings = bookings.filter(booking => booking.type === type);
//         res.status(200).json(filteredBookings);
//     } catch (err) {
//         next(err);
//     }
// };


// module.exports = {
//     Booking,
//     getBooking,
//     getBookings,
//     deleteBooking,
//     updateBooking,
//     getBookingByType
// };





//////////////////////////////////////////////////////////////


const Booking = require("../models/booking.js");
const Table = require('../models/table');


const createBooking = async (req, res, next) => {
    try {
            const newBooking = new Booking({
                ...req.body, 
            });
            await newBooking.save();
            res.status(200).json(newBooking);
    } catch (err) {
        next(err);
    }
}

const updateBooking = async (req, res, next) => {
    try {
            const updateData = { ...req.body};
            const updatedBooking = await Booking.findByIdAndUpdate(
                req.params.id,
                { $set: updateData },
                { new: true, runValidators: true }
            );
            if (!updatedBooking) {
                return res.status(404).json("Booking not found.");
            }

            res.json(updatedBooking);
    } catch (error) {
        next(error);
    }
};

const deleteBooking = async (req, res, next) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.status(200).json("Booking has been deleted.");
    } catch (err) {
        next(err);
    }
};

const getBooking = async (req, res, next) => {
    try {
        const Booking = await Booking.findById(req.params.id);
        res.status(200).json(Booking);
    } catch (err) {
        next(err);
    }
};

// const getBookings = async (req, res, next) => {
//     try {
//         const Bookings = await Booking.find();
//         res.status(200).json(Bookings);
//     } catch (err) {
//         next(err);
//     }
// };
const getBookings = async (req, res, next) => {
    try {
      // Tìm tất cả các booking
      const bookings = await Booking.find();
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json("No bookings found.");
      }
      
      // Lấy tất cả IDs của table từ bookings
      const tableIds = bookings.map(booking => booking.table);
  
      // Tìm thông tin của tất cả các bảng dựa trên IDs
      const tables = await Table.find({ _id: { $in: tableIds } });
  
      // Tạo một bản đồ để ánh xạ table ID với tên của nó
      const tableMap = {};
      tables.forEach(table => {
        tableMap[table._id] = table.name;
      });
  
      // Thêm tên bảng vào mỗi booking
      const bookingsWithTableNames = bookings.map(booking => {
        return {
          ...booking.toObject(), 
          tableName: tableMap[booking.table] || 'Unknown Table',
        };
      });
  
      // Trả về danh sách booking đã có tên bảng
      res.status(200).json(bookingsWithTableNames);
    } catch (err) {
      next(err);
    }
  };
  

const getBookingsByUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const bookings = await Booking.find({ user: userId });
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json("No bookings found for this user.");
      }
      const tableIds = bookings.map(booking => booking.table);
      const tables = await Table.find({ _id: { $in: tableIds } });
      const tableMap = {};
      tables.forEach(table => {
        tableMap[table._id] = table.name;
      });

      const bookingsWithTableNames = bookings.map(booking => {
        return {
          ...booking.toObject(), 
          tableName: tableMap[booking.table] || 'Unknown Table',
        };
      });
  
      res.status(200).json(bookingsWithTableNames);
    } catch (err) {
      next(err);
    }
  };
  
const validateBooking = async (req, res, next) => {
    const { idTable, selectedDate } = req.params;
  console.log("idTable", idTable);
  console.log("selectedDate",selectedDate);
    try {
      const start = new Date(selectedDate);
      const end = new Date(start);
  
      start.setHours(0, 0, 0, 0); 
      end.setHours(23, 59, 59, 999); 
  
      const bookings = await Booking.find({
        table: idTable,
        startTime: { $gte: start, $lt: end },
        status: 'confirmed' 
      });
  
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ message: 'Đã xảy ra lỗi', error: err.message });
    }
  }
  
module.exports = {
    createBooking,
    updateBooking,
    deleteBooking,
    getBooking,
    getBookings,
    getBookingsByUser,
    validateBooking
};