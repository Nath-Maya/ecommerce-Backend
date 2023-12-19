import cartModel from "./models/carts.model.js";

export default class Carts {
  constructor() {
    console.log("\u001b[1;32m Database MongoDB");
  }

  get = async () => {
      let carts = await cartModel.find().lean();
      return carts;
  };

  save = async (cart) => {
    let result = await cartModel.create(cart)
    return result;
  }


  getCartId = async (idCart) => {
    let cart = await cartModel.findById(idCart);
    return cart;
  };

  getCartByIdPopulate = async(idCart) => {
    let cart =  await cartModel.findOne({'__id': id}).populate("products.product").lean();
    return cart;
  }

  updateCart = async (idCart, cart) => {
    let result = await cartModel.findByIdAndUpdate(idCart, cart, { new: true});
    return result;
  }

}
