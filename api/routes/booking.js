// const express = require("express");
// const { Booking, getBooking, getBookings, deleteBooking , updateBooking, getBookingByType} = require("../controllers/bookingController.js");

// const router = express.Router();

// router.put("/:id", Booking);
// router.get("/:idUser", getBooking);
// router.get("/find/:type", getBookingByType);
// router.get("/", getBookings);
// router.delete("/:idBooking", deleteBooking);
// router.put("/update/:idBooking", updateBooking);


// module.exports = router;


//////////////////////////////////////////////////////////////////////////////////////////


const express = require("express");
const { createBooking,
    updateBooking,
    deleteBooking,
    getBooking,
    getBookings,
    getBookingsByUser,
    validateBooking} = require("../controllers/bookingController.js");

const router = express.Router();

// CREATE
router.post('/',  createBooking);
//UPDATE
router.put("/:id", updateBooking);
//DELETE
router.delete("/:id", deleteBooking);
//GET
router.get("/:id", getBooking);
//GET ALL
router.get("/", getBookings);

//GET ALL booking by user id
router.get("/user/:userId", getBookingsByUser);

// validate
router.get("/validate/:idTable/:selectedDate", validateBooking)

module.exports = router;