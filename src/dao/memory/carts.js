import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";

export default class Cart {
  constructor() {}

  getAllCart = async () => {
    try {
      let result = await cartModel.find().lean();
      console.log("\u001b[1;36m Carritos Cargados");
      return result;
    } catch (error) {
      console.log("\u001b[1;31m Error al cargar carritos");
    }
  };

  getCartId = async (idCart) => {
    try {
      const cart = await cartModel.findById(idCart);
      console.log("\u001b[1;36m Carrito Encontrado: ");
      return cart;
    } catch (error) {
      console.log("\u001b[1;31m Carrito NO Encontrado");
    }
  };

  saveCart = async (cart) => {
    try {
      await cartModel.create(cart);
      return "Carrito agregado";
    } catch (error) {
      console.error("Error al agregar el carrito", error);
      return "Error al agregar el carrito";
    }
  };

  updateCart = async (idCart, cart) => {
    let result = await cartModel.findByIdAndUpdate(idCart, cart, { new: true }); //Entrego el id y entrego la data que debo actualizar
    console.log("\u001b[1;36m Cart actualizado");
    return result;
  };

  deleteCart = async (idCart) => {
    let result = await cartModel.deleteOne({ _id: `${idCart}` });
    console.log("\u001b[1;31m Cart Eliminado");
    return result;
  };

  insertProductCart = async (idCart, idProduct) => {
    try {
      const cart = await cartModel.findById(idCart);
      if (!cart) return "Carrito no encontrado";
      const existingProduct = cart.products.find(
        (product) => product.idProduct === idProduct
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({
          productId: idProduct,
          quantity: 1,
        });
      }
      await cart.save();
      console.log("\u001b[1;36m Producto Agregado al carrito");
      return cart;
    } catch (error) {
      throw "Error al insertar producto en carrito" + error;
    }
  };

  updateProductCart = async (idCart, idProduct, newQuantity) => {
    try {
      const cart = await cartModel.findById(idCart);
      if (!cart) {
        return "Carrito no encontrado";
      }

      console.log(idProduct);
      const product = await productModel.findById(idProduct);
      console.log(product);
      if (!product) {
        return "Producto no encontrado";
      }
      const existingProduct =
        Array.isArray(cart.products) &&
        cart.products.find((product) => product._id.toString() === idProduct);

      console.log("----->" + existingProduct);

      if (existingProduct) {
        const result = await cartModel.findOneAndUpdate(
          { _id: idCart, "products._id": idProduct },
          { $set: { "products.$.quantity": newQuantity } },
          { new: true }
        );

        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  deleteProductCart = async (idCart, idProduct) => {
    {
      try {
        const cart = await cartModel.findById(idCart);
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

  deleteAllProductsCart = async (idCart) => {
    try {
      const cart = await cartModel.findById(idCart);

      if (!cart) {
        return "Carrito no encontrado";
      }
      cart.products = [];

      await cart.save();

      return "Productos  eliminados del carrito";
    } catch (error) {
      console.error("Error:", error);
      return "Error al eliminar los productos del carrito";
    }
  };
}
