import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProductRouter = Router();
const product = new ProductManager();

//Consulta de todos los productos
ProductRouter.get("/", async (req, res) => {
  res.send(await product.getAllProducts());
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
