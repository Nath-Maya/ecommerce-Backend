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
  
  //! DELETE PRODUCT FROM CART
  //Eliminar un producto de un carrito especifico, con los id suministrados tanto de cart como de product.

  deleteProductCart = async (idCart, idProduct) => {
    {
      try {
        const cart = await cartsModel.findById(idCart);
        if (!cart) {
          return "Carrito no encontrado";
        }
        const productIndex = cart.products.findIndex(
          (product) => product.productId === idProduct
        );

        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1);
          await cart.save();
          return "Producto eliminado del carrito";
        } else {
          return "Producto no encontrado en el carrito";
        }
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        return "Error al eliminar el producto del carrito";
      }
    }
  };
}
