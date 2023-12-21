import { Router } from "express";
import Product from "../dao/products.js";

const productRouter = Router();
const productManager = new Product();


productRouter.post("/", async (req, res) => {
  let { title, description, price, image, category, stock } = req.body;

  const newProduct = {
    title: title,
    description: description,
    price: price,
    image: image,
    category: category,
    stock: stock,
  };

  res.send(await productManager.postProduct(newProduct));
});


productRouter.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

    const totalProducts = await productManager.getAllProducts();
    const totalPages = Math.ceil(totalProducts / pageSize);

    const skip = (page - 1) * pageSize;

    const products = await productManager.getProductsPage(page, pageSize);
    const response = {
      status: "success",
      payload: products,
      totalPages: totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page: page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/products/?page=${page - 1}` : null,
      nextLink: page < totalPages ? `/products/?page=${page + 1}` : null,
    };

    res.json(response);
  } catch (error) {
    console.error("Error en la ruta GET /products:", error);
  }
});



productRouter.get("/:idProduct", async (req, res) => {
  let idProduct = req.params.idProduct;
  try {
    let result = await productManager.getProductId(idProduct);
    res.send({ status: "succes", payload: result });
  } catch (error) {
    console.error("Producto no encontrado");
  }
});



productRouter.get("/sample-products", async (req, res) => {
  let limit = 10;
  try {
    const products = await productManager.getProductsLimit(limit);
    res.send({ status: "succes", payload: products });
  } catch (error) {
    console.error("Error en la ruta GET /products:", error);
  }
});



productRouter.get("/page-products/:page", async (req, res) => {
  let page = parseInt(req.params.page);
  page = isNaN(page) || page <= 0 ? 1 : page;

  const productByPage = 15;
  res.send(await productManager.getProductsPage(page, productByPage));
});



productRouter.get("/query/:query", async (req, res) => {
  const query = req.query.query;
  res.send(await productManager.getProductQuery(query));
});


productRouter.get("/sort/:sort", async (req, res) => {
  const sort = req.params.sort;
  const sortOrder =
    parseInt(sort) === 1 || parseInt(sort) === -1
      ? parseInt(sort) === -1
        ? "desc"
        : "asc"
      : "asc";

  res.send(await productManager.getProductOrder(sortOrder));
});


productRouter.put("/:idProduct", async (req, res) => {
  let { idProduct } = req.params;
  let productReplace = req.body;

  let result = await productManager.updateProduct(idProduct, productReplace);
  res.send({ status: "sucess", payload: result });
});


productRouter.delete("/:idProduct", async (req, res) => {
  let { idProduct } = req.params;
  let result = await productManager.deleteProduct(idProduct);
  res.send("Producto Eliminado");
});

export default productRouter;
