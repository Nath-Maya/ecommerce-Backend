import { promises as fs } from "fs";
import { nanoid } from "nanoid";

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
    return carts.find(cart => cart.id === id);
  }

  async addCart() {
    let previousCart = await this.readCart();
    let id = nanoid(5);
    let fullCart = [{ id: id, products: [] }, ...previousCart];
    await this.writeCart(fullCart);
    return "Producto agregado al carrito";
  }

  async getCartd(id) {
    let cartId = await this.existId(id);
    if (!cartId) return "Carrito no encontrado";
    return cartId;
  }
}

export default CartManager;
