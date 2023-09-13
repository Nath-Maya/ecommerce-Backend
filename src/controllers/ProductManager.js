import { promises as fs } from "fs";
import { nanoid } from "nanoid"; //genera ids automaticos

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json"; //Crear la ruta del archivo
  }

  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8"); //Leer los arreglos en el arreglo de productos
    return JSON.parse(products);
  };

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };

  //! -----INGRESAR LOS PRODUCTOS EN EL ARREGLO.

  addProducts = async (product) => {
    let productsOld = await this.readProducts();
    product.id = nanoid(5); //El numero que entra como parametro determina la cant de digitos del id.
    let allProducts = [...productsOld, product];
    await this.writeProducts(allProducts);
    return "Producto agregado";
  };

  //!-----GET PRODUCTS

  getProducts = async () => {
    return await this.readProducts();
  };
}

export default ProductManager;
