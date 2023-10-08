import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true }
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);
