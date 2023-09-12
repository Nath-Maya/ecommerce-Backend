import express from "express";
import ProductManager from "./controllers/ProductManager.js";

const product = new ProductManager();


const app = express();
const PORT = 8080;

//Decirle al servidor que trabajaremos con JSON y que usara URL.
app.use(express.json());
app.use(express.urlencoded({ extended: true}));




app.post("/products", async (req, res) => {
   let newProduct = req.body
   res.send(await product.writeProducts(newProduct));
   
})





//LEVANTAR SERVIDOR
app.listen(PORT, () => {
   console.log("\u001b[1;35m Servidor express Puerto: " + PORT);
});