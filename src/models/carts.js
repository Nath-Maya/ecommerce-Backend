import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = mongoose.Schema({
   description: String,
   quantity: Number,
   total: Number
});

module.exports = mongoose.model(cartsCollection, cartSchema);