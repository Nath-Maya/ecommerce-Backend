import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import ProductManager from "./ProductManager.js";

const totalProduct = new ProductManager();

class CartManager {
  constructor() {
    this.cartFilePath = "./src/models/carts.json";
  }

  async readCart() {
    let carts = await fs.readFile(this.cartFilePath, "utf-8"); //Leer los arreglos en el arreglo de productos
    return JSON.parse(carts);
  }

  async writeCart(cart) {
    await fs.writeFile(this.cartFilePath, JSON.stringify(cart));
  }

  async existId(id) {
    let carts = await this.readCart();
    return carts.find((cart) => cart.id === id);
  }

  async addCart() {
    let previousCart = await this.readCart();
    let id = nanoid(5);
    let fullCart = [{ id: id, products: []}, ...previousCart];
    await this.writeCart(fullCart);
    return "Carrito agregado";
  }

  async getCartd(id) {
    let cartId = await this.existId(id);
    if (!cartId) return "Carrito no encontrado";
    return cartId;
  }

  
  async addProductCart(cartId, productId) {
    let cartById = await this.existId(cartId);
    if (!cartById) return "Carrito no encontrado";
    let productById = await totalProduct.existId(productId);
    if (!cartById) return "Producto no encontrado";

    let allCart = await this.readCart();
    let cartFilter = allCart.filter((cart) => cart.id != cartId);
    if (cartById.products.some(prod => prod.id === productId)){
      let productExistCart = cartById.products.find(
        (prod) => prod.id === productId);
      productExistCart.cantidad + 1;
      let cartConcat = [cartById, ...cartFilter];
      await this.writeCart(cartConcat);
      return "Producto SUMADO al carrito";
    }
    
    let totalCart = [
      { id: cartId, products: { id:productById.id, cantidad: 1 } },
      ...cartFilter,
    ];
    await this.writeCart(totalCart);
    return "Producto agregado al carrito";
    
  }
  
}

export default CartManager;
