import { Router } from "express";
import ProductDAO from "../dao/mongo/productsDao.js";

const router = Router();
const productService = new ProductDAO();

router.post("/", async (req, res) => {
  try {
    const { title, description, price, image, category, stock } = req.body;

    const newProduct = {
      title,
      description,
      price,
      image,
      category,
      stock,
    };

    const result = await productService.postProduct(newProduct);
    res.json({ status: "success", payload: result });
  } catch (error) {
    console.error("Error en la ruta POST /products:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta POST /products" });
  }
});

router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10;

    const totalProducts = await productService.getAllProducts();
    const totalPages = Math.ceil(totalProducts / pageSize);

    const skip = (page - 1) * pageSize;

    const products = await productService.getProductsPage(page, pageSize);
    const response = {
      status: "success",
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      page,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/products/?page=${page - 1}` : null,
      nextLink: page < totalPages ? `/products/?page=${page + 1}` : null,
    };

    res.json(response);
  } catch (error) {
    console.error("Error en la ruta GET /products:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta GET /products" });
  }
});

router.get("/:idProduct", async (req, res) => {
  const idProduct = req.params.idProduct;
  try {
    const result = await productService.getProductId(idProduct);
    res.json({ status: "success", payload: result });
  } catch (error) {
    console.error("Producto no encontrado:", error);
    res.status(404).json({ status: "error", error: "Producto no encontrado" });
  }
});

router.get("/sample-products", async (req, res) => {
  const limit = 10;
  try {
    const products = await productService.getProductsLimit(limit);
    res.json({ status: "success", payload: products });
  } catch (error) {
    console.error("Error en la ruta GET /sample-products:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta GET /sample-products" });
  }
});

router.get("/page-products/:page", async (req, res) => {
  let page = parseInt(req.params.page);
  page = isNaN(page) || page <= 0 ? 1 : page;

  const productByPage = 15;
  try {
    const result = await productService.getProductsPage(page, productByPage);
    res.json({ status: "success", payload: result });
  } catch (error) {
    console.error("Error en la ruta GET /page-products/:page:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta GET /page-products/:page" });
  }
});

router.get("/query/:query", async (req, res) => {
  const query = req.params.query;
  try {
    const result = await productService.getProductQuery(query);
    res.json({ status: "success", payload: result });
  } catch (error) {
    console.error("Error en la ruta GET /query/:query:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta GET /query/:query" });
  }
});

router.get("/sort/:sort", async (req, res) => {
  const sort = req.params.sort;
  const sortOrder = parseInt(sort) === 1 || parseInt(sort) === -1
    ? parseInt(sort) === -1
      ? "desc"
      : "asc"
    : "asc";

  try {
    const result = await productService.getProductOrder(sortOrder);
    res.json({ status: "success", payload: result });
  } catch (error) {
    console.error("Error en la ruta GET /sort/:sort:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta GET /sort/:sort" });
  }
});

router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const productReplace = req.body;

  try {
    const result = await productService.updateProduct(idProduct, productReplace);
    res.json({ status: "success", payload: result });
  } catch (error) {
    console.error("Error en la ruta PUT /:idProduct:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta PUT /:idProduct" });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    await productService.deleteProduct(idProduct);
    res.json({ status: "success", payload: "Producto Eliminado" });
  } catch (error) {
    console.error("Error en la ruta DELETE /:idProduct:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta DELETE /:idProduct" });
  }
});

export default router;
