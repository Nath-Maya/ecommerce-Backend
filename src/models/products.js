import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = mongoose.Schema({
   title: { type: String, required: true},
   description: { type: String, required: true},
   price: { type: Number, required: true},
   image: { type: String, required: true},
   stock: { type: Number, required: true},
});

module.exports = mongoose.model(productsCollection, productSchema);