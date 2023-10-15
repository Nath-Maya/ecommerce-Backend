import { Router } from "express";
import Product from "../DAO/dbManager/products.js";

const productRouter = Router();
const productManager = new Product();

//!!  POST PRODUCT
//Agregar un producto
productRouter.post("/", async (req, res) => {
  let { title, description, price, image, stock } = req.body;

  const newProduct = {
    title: title,
    description: description,
    price: price,
    image: image,
    stock: stock,
  };

  res.send(await productManager.postProduct(newProduct));
});

//!!  GET PRODUCTS
// Consulta de todos los productos con límite opcional
productRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getAllProducts();
    res.send({ status: "succes", payload: products });
  } catch (error) {
    console.error("Error en la ruta GET /products:", error);
  }
});

//! GET LIMIT

productRouter.get("/sample-products", async (req, res) => {
  let limit = 10;
  try {
    const products = await productManager.getProductsLimit(limit);
    res.send({ status: "succes", payload: products });
  } catch (error) {
    console.error("Error en la ruta GET /products:", error);
  }
});

//! GET PAGE

productRouter.get("/page-products/:page", async (req, res) => {
  let page = parseInt(req.params.page);
  page = isNaN(page) || page <= 0 ? 1 : page;

  const productByPage = 15;
  res.send(await productManager.getProductsPage(page, productByPage));
});

//! GET QUERY

productRouter.get("/query/:query", async (req, res) => {
  const query = req.query.query
  res.send(await productManager.getProductQuery(query))
})

//!GET SORT

productRouter.get("/sort/:sort", async (req, res) => {
  const sort = req.params.sort
  const sortOrder = (parseInt(sort) === 1 || parseInt(sort) === -1) ? (parseInt(sort) === -1 ? "desc" : "asc") : "asc";

  console.log("----" + sortOrder)
  res.send(await productManager.getProductOrder(sortOrder))
})

//!!  UPDATE PRODUCT
//Actualizar un producto
productRouter.put("/:idProduct", async (req, res) => {
  let { idProduct } = req.params;
  let productReplace = req.body;

  let result = await productManager.updateProduct(idProduct, productReplace);
  res.send({ status: "sucess", payload: result });
});


//!!  DELETE PRODUCT
//Eliminar un producto
productRouter.delete("/:idProduct", async (req, res) => {
  let { idProduct } = req.params;
  let result = await productManager.deleteProduct(idProduct);
  res.send("Producto Eliminado");
});

export default productRouter;
