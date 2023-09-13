import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";

const app = express();
const PORT = 8080;

//Decirle al servidor que trabajaremos con JSON y que usara URL.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);

//Levantar servidor 
app.listen(PORT, () => {
  console.log("\u001b[1;35m Servidor express Puerto: " + PORT);
});
