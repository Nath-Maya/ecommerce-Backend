import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;

//Decirle al servidor que trabajaremos con JSON y que usara URL.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//**** UP SERVER  */
app.listen(PORT, () => {
  console.log("\u001b[1;35m Up Server: " + PORT);
});


//**** CONECT DATABASE  */

mongoose.connect("mongodb+srv://1234Maya@cluster0.g6udpni.mongodb.net/")
.then(()=> {
  console.log("\u001b[1;32m Connection successful at the database");
})
.catch(error => {
  console.error("\u001b[1;31m Connection failed at the database" + error)

});


//Rutas para verificar funcionamiento de CRUD con thunderclient
app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/message", MessageRouter)

