import cartModel from "../models/carts.model.js";

export default class Cart {
  constructor() {}

  saveCart = async (cart) => {
    let result = await cartModel.create(cart);
    console.log("\u001b[1;33m Cart guardado")
    return result;
  };

  getAllCart = async () => {
    let result = await cartModel.find().lean();
    return result;
  };

  updateCart = async (idCart, cart) => {
   let result = await cartModel.findByIdAndUpdate(idCart, cart,{new: true}); //Entrego el id y entrego la data que debo actualizar
   console.log("\u001b[1;33m Cart actualizado")
   return result
};

   deleteCart = async (idCart) => {
      let result = await cartModel.deleteOne({_id: `${idCart}`});
      return result
   }
}
