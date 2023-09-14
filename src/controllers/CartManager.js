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
    const cartById = await this.existId(cartId);
    if (!cartById) return "Carrito no encontrado";
    
    const productById = await totalProduct.existId(productId);
    if (!productById) return "Producto no encontrado";
  
    const allCart = await this.readCart();
  
    for (const cartItem of allCart) {
      if (cartItem.id === cartId) {
        const existingProduct = cartItem.products.find((product) => product.id === productId);
        if (existingProduct) {
          existingProduct.cantidad++;
        } else {
          cartItem.products.push({ id: productId, cantidad: 1 });
        }
      }
    }
  
    await this.writeCart(allCart);
    return "Producto agregado al carrito";
  }
  
  
  
}

export default CartManager;
