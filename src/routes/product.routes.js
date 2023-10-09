import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProductRouter = Router();
const product = new ProductManager();

//Consulta de todos los productos
/*
ProductRouter.get("/", async (req, res) => {
  res.send(await product.getAllProducts());
});
*/

// Consulta de todos los productos con límite opcional
ProductRouter.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    console.log("Limit:", limit); // Verifica si se recibe el valor del parámetro "limit"

    const products = await product.getAllProducts();

    if (!isNaN(limit)) {
      res.send(products.slice(0, limit));
    } else {
      res.send(products);
    }
  } catch (error) {
    console.error("Error en la ruta GET /api/products:", error);

  }
});



//Consulta del producto con determinado id
ProductRouter.get("/:id", async (req, res) => {
  let id = req.params.id; //req.params trae un string
  res.send(await product.getProductId(id));
});

//Agregar un producto
ProductRouter.post("/", async (req, res) => {
  let newProduct = req.body;
  res.send(await product.addProduct(newProduct));
});

//Actualizar un producto
ProductRouter.put("/:id", async (req, res) => {
  let id = req.params.id;
  let updateProduct = req.body;
  res.send(await product.updateProducts(id, updateProduct));
});

//Eliminar un producto
ProductRouter.delete("/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.deletProductId(id));
});

export default ProductRouter;
