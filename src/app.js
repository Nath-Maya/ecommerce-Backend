import express from 'express';
import { clearScreenDown } from 'readline';
import { ProductManager } from './components/ProductManager.js';

const app = express();

app.use(express.urlencoded({extended: true}));

const productos = new ProductManager();
const readProducts = productos.readProducts();

//Solicitud de consulta de producto definiendo limit. 
app.get("/products", async (req,res) => {
   //limit convertido en numero
   let limit = parseInt(req.query.limit);
   if (!limit) return res.send(await readProducts)
   let allProducts = await readProducts;
   let productLimit = allProducts.slice(0,limit);
   res.send(productLimit);
});

 //Solicitud de un producto con un Id.
 app.get("/products/:id", async (req, res) => {
   //variable donde se guardara el id. 
   let id = parseInt(req.params.id);
   let allProducts = await readProducts;
   let productById = allProducts.find(product => product.id === id);

   if(productById) {
      return res.send(productById); 
      }else{
        return res.send('Product not found')
      } 

 


})


//Peticion del servidor
const PORT = 8080;
const server = app.listen(PORT, () => {
   console.log(`Express local host ${server.address().port}`);
});

//Error al no encontrar el servidor
server.on("error", (error) => console.log(`Error del servidor ${error}`));



