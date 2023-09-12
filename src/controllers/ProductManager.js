//Se inicia con la importacion de las promesas
import { promises as fs } from "fs"

class ProductManager {
  constructor() {
    this.path = "./src/models/products.json" //Crear la ruta del archivo
  }

  //! -----INGRESAR LOS PRODUCTOS EN EL ARREGLO.

  writeProducts = async (product) => {
    ;

    try {
      //Leer los arreglos en el arreglo de productos
    let products = await fs.readFile(this.path, 'utf-8');
    //se debe parsear
    let productsParse = JSON.parse(products); //archivo json
    let allProducts = [...productsParse, product];
    await fs.writeFile(this.path, JSON.stringify(allProducts));
    return "Producto agregado"
      
    } catch (error) {
      console.error("Error al ingresar al archivo de productos: ",error);
      return "Error al agregar producto";
    }

  };
}

export default ProductManager; 


