import mongoose from "mongoose";

const cartsCollection = "carts";

<<<<<<< HEAD
const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        qty: { type: Number, required: true, default: 1 },
      },
    ],
  },
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

export default cartModel;
=======
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
>>>>>>> main
