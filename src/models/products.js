import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = mongoose.Schema({
   title: String,
   description: String,
   price: Number,
   image: String,
   stock: Number,
});

module.exports = mongoose.model(productsCollection, productSchema);