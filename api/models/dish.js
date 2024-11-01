
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the sub-schema for evalue
const evalueSchema = new mongoose.Schema({
    star: { type: Number, required: true },
    comment: { type: String},
    idUser: { type: mongoose.Schema.Types.ObjectId, required: true }
});

const DishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    chef: {
        type: [String]
    },
    description: {
        type: String
    },
    evalue: [evalueSchema], // Use the sub-schema here
    image: {
        type:[String]
    },
    price: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

// const Dish = mongoose.model('Dish', dishSchema);
module.exports = mongoose.model('Dish', DishSchema,'dish');
// module.exports = Dish;

