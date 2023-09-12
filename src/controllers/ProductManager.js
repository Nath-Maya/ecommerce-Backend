//Se inicia con la importacion de las promesas
import { promises as fs } from "fs"

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json"; //Crear la ruta del archivo
  }

  //! -----INGRESAR LOS PRODUCTOS EN EL ARREGLO.

  writeProducts = async (product) => {
    //Leer los arreglos en el arreglo de productos
    let products = await fs.readFile(this.path, 'utf-8');
    //se debe parsear
    let productsParse = JSON.parse(products); //archivo json
    console.log(productsParse);
  };
}

const product = new ProductManager

product.writeProducts()
