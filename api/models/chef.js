const mongoose = require('mongoose');
const ChefSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chef", ChefSchema);
