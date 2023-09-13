//Se inicia con la importacion de las promesas
import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json"; //Crear la ruta del archivo
  }

  //metodo para leer los productos.
  readProducts = async () => {
     //Leer los arreglos en el arreglo de productos
     let products = await fs.readFile(this.path, "utf-8");
     //se debe parsear
     return  JSON.parse(products); //archivo json
  };

  writeProducts = async(product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };


  //! -----INGRESAR LOS PRODUCTOS EN EL ARREGLO.

  addProducts = async (product) => {
    let productsOld = await this.readProducts();
    try {
      let allProducts = [...productsOld, product];
      await this.readProducts(allProducts);
      return "Producto agregado";
    } catch (error) {
      console.error("Error al ingresar al archivo de productos: ", error);
      return "Error al agregar producto";
    }
  };

  //!-----GET PRODUCTS
  //Devolver los productos que estan en el json. 

  getProducts = async () => {
    return await this.readProducts();
  };













};

export default ProductManager;
