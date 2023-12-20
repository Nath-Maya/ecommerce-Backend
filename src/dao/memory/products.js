import productModel from "../models/products.model.js";

export default class Products {
  constructor() {}


  postProduct = async (product) => {
    let result = await productModel.create(product);
    console.log("\u001b[1;36m Producto guardado");
    return result;
  };


  getAllProducts = async () => {
    let result = await productModel.find().lean();
    return result;
  };

  getProductId = async (idProduct) => {
    let result = await productModel.findById(idProduct);
    console.log("\u001b[1;36m Producto Encontrado");
    return result;
  
  }

  getProductsLimit = async (limit) => {
    try {
      const products = await productModel.find().limit(limit);
      limit = products.length < limit ? products.length : limit;

      return products;
    } catch (error) {
      throw error;
    }
  };

  getProductsPage = async (page, productByPage) => {
    page = page <= 0 ? 1 : page;
    try {
      const products = await productModel
        .find()
        .skip((page - 1) * productByPage)
        .limit(productByPage);
      return products;
    } catch (error) {
      throw error;
    }
  };

  getProductQuery = async (query) => {
    try {
      const products = await productModel.find({
        description: { $regex: query, $options: "i" },
      });
      return products;
    } catch (error) {
      throw error;
    }
  };

  getProductOrder = async (sort) => {
    try {
      const products = await productModel.find().sort({ price: sort });
      return products;
    } catch (error) {
      throw new Error(`Error al ordenar productos: ${error.message}`);
    } 
  };

  updateProduct = async (idProduct, product) => {
    let result = await productModel.findByIdAndUpdate(idProduct, product, {
      new: true,
    }); //Entrego el id y entrego la data que debo actualizar
    console.log("\u001b[1;36m Producto actualizado");
    return result;
  };

  deleteProduct = async (idProduct) => {
    let result = await productModel.deleteOne({ _id: idProduct });
    console.log("\u001b[1;31m Producto Eliminado");
    return result;
  };
}
