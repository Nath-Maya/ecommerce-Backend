import express from "express";
import mongoose from "mongoose";
import cartRouter from "./routes/cart.routes.js"
import productRouter from "./routes/product.routes.js";
import __dirname from "./utils.js"
import handlebars from 'express-handlebars';
import viewsRouter from "./routes/view.routes.js"
import messageRouter from "./routes/message.routes.js"


const app = express();
const PORT = 3000;

//Decirle al servidor que trabajaremos con JSON y que usara URL.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//**** CONECT DATABASE  */

mongoose
  .connect(
    "mongodb+srv://nathamayaramirez93:1234Maya@cluster0.g6udpni.mongodb.net/ecommerce?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("\u001b[1;34m Connection successful at the database");
  })
  .catch((error) => {
    console.error("\u001b[1;31m Connection failed at the database" + error);
  });


//Rutas para verificar funcionamiento de CRUD con thunderclient
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use('/',viewsRouter)
app.use("/message", messageRouter);

//**** HANDLEBARS */

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');


//**** UP SERVER  */
app.listen(PORT, () => {
  console.log("\u001b[1;35m Up Server: " + PORT);
});

