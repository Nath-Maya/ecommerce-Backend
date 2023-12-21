import productModel from "../models/products.model.js";

export default class ProductDAO {
  constructor() {}

  addProduct = async (product) => {
    try {
      await productModel.create(product);
      return "Producto agregado";
    } catch (error) {
      console.error("Error al agregar el producto", error.message);
      throw new Error("Error al agregar el producto");
    }
  };

  getAllProducts = async () => {
    try {
      let result = await productModel.find().lean();
      return result;
    } catch (error) {
      console.error("Error al obtener productos", error.message);
      throw new Error("Error al obtener productos");
    }
  };

  getProductId = async (idProduct) => {
    try {
      let result = await productModel.findById(idProduct);
      return result;
    } catch (error) {
      console.error("Producto no encontrado", error.message);
      throw new Error("Producto no encontrado");
    }
  };

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
    try {
      let result = await productModel.findByIdAndUpdate(idProduct, product, {
        new: true,
      });
      return result;
    } catch (error) {
      console.error("Producto no actualizado", error.message);
      throw new Error("Producto no actualizado");
    }
  };

  deleteProduct = async (idProduct) => {
    try {
      let result = await productModel.deleteOne({ _id: idProduct });
      return result;
    } catch (error) {
      console.error("Producto no eliminado", error.message);
      throw new Error("Producto no eliminado");
    }
  };
}
