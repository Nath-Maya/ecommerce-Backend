import mongoose from "mongoose";

const cartsCollection = "carts";

/*
const cartSchema = mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true }
});
*/

const cartSchema = new mongoose.Schema({ 
  products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId, // Cambiamos el tipo a ObjectId
          ref: 'products',
        },
        quantity: Number,
      },
    ],
})

 const cartModel = mongoose.model(cartsCollection, cartSchema);

 export default cartModel