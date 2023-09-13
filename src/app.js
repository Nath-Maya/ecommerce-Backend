import express from "express";
import ProductManager from "./controllers/ProductManager.js";

const product = new ProductManager();

const app = express();
const PORT = 8080;

//Decirle al servidor que trabajaremos con JSON y que usara URL.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Consulta de todos los productos
app.get("/products", async (req, res) => {
  res.send(await product.getAllProducts());
});

//Consulta del producto con determinado id
app.get("/products/:id", async (req, res) => {
  let id = req.params.id; //req.params trae un string
  res.send(await product.getProductId(id));
});

//Agregar un producto
app.post("/products", async (req, res) => {
  let newProduct = req.body;
  res.send(await product.addProduct(newProduct));
});

//Eliminar un producto
app.delete("/products", async (req, res) => {
  let id = req.params.id;
  res.send(await product.deleteProduct(id));
});

//!-----LEVANTAR SERVIDOR

app.listen(PORT, () => {
  console.log("\u001b[1;35m Servidor express Puerto: " + PORT);
});
