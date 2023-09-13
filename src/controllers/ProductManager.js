import { promises as fs } from "fs";
import { nanoid } from "nanoid"; //genera ids automaticos

class ProductManager {
  constructor() {
    this.productsFilePath = "./src/models/products.json"; //Crear la ruta del archivo
  }

  //? Lee los productos desde el archivo json.

  readProducts = async () => {
    let products = await fs.readFile(this.productsFilePath, "utf-8"); //Leer los arreglos en el arreglo de productos
    return JSON.parse(products);
  };

  //? Escribe los productos en el archivo json.

  writeProducts = async (product) => {
    await fs.writeFile(this.productsFilePath, JSON.stringify(product));
  };

  //? Agrega el producto al arreglo del archivo.

  addProduct = async (product) => {
    let productsOld = await this.readProducts();
    product.id = nanoid(5); //El numero que entra como parametro determina la cant de digitos del id.
    let allProducts = [...productsOld, product];
    await this.writeProducts(allProducts);
    return "Producto agregado";
  };

  //? Obtener todos los productos contenidos en el arregl

  getAllProducts = async () => {
    return await this.readProducts();
  };

  //? Muestra el producto que corresponda a un id dado.

  getProductId = async (id) => {
    try {
      let products = await this.readProducts();
      let productId = products.find((prod) => prod.id === id); // Buscar con el id
      if (productId) {
        return productId;
      } else {
        throw new Error(`No se encontró ningún producto con el ID ${id}`);
      }
    } catch (error) {
      console.error("Error al obtener el producto por ID: ", error);
      throw error;
    }
  };

  //? Eliminar un producto

  


}

export default ProductManager;
