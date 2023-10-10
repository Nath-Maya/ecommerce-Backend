import productModel from "../models/products.model.js";

export default class Products {
  constructor() {}

  //!   POST
  postProduct = async (product) => {
    let result = await productModel.create(product);
    console.log("\u001b[1;36m Producto guardado");
    return result;
  };

  //!   GET
  getAllProducts = async () => {
    let result = await productModel.find().lean();
    return result;
  };


  //!   PUT
  updateProduct = async (idProduct, product) => {
    let result = await productModel.findByIdAndUpdate(idProduct, product, {
      new: true,
    }); //Entrego el id y entrego la data que debo actualizar
    console.log("\u001b[1;36m Producto actualizado");
    return result;
  };

  //!   DELETE
  deleteProduct = async (idProduct) => {
    let result = await productModel.deleteOne({ _id: idProduct });
    console.log("\u001b[1;31m Producto Eliminado");
    return result;
  };
}
