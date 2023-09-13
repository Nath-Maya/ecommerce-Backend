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

  async addCartProd() {
   let previousCart = await this.readCart();
   let id = nanoid(5)
   let fullCart = [{id : id, products : []}, ...previousCart]
   await this.writeCart(fullCart)
   return "Producto agregado al carrito"

}

}

export default CartManager
