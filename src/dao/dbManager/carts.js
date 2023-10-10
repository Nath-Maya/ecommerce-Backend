import cartModel from "../models/carts.model.js";

export default class Cart {
  constructor() {}

  //* POST
  saveCart = async (cart) => {
    let result = await cartModel.create(cart);
    console.log("\u001b[1;36m Cart guardado");
    return result;
  };

  //* GET
  getAllCart = async () => {
    let result = await cartModel.find().lean();
    return result;
  };

  //* PUT
  updateCart = async (idCart, cart) => {
    let result = await cartModel.findByIdAndUpdate(idCart, cart, { new: true }); //Entrego el id y entrego la data que debo actualizar
    console.log("\u001b[1;36m Cart actualizado");
    return result;
  };
  //* DELETE
  deleteCart = async (idCart) => {
    let result = await cartModel.deleteOne({ _id: `${idCart}` });
    console.log("\u001b[1;31m Cart Eliminado");
    return result;
  };
}
