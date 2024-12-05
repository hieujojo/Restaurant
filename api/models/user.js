const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    gender: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    booking: [
        {
            type: { type: String},
        }
    ],


    // test au
    // role: {
    //     type: String,
    //     default: "customer",
    //     enum: ['super-admin','admin', 'manage', 'customer']
    // }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
