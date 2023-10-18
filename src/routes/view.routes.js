import { Router } from "express";
import Products from "../DAO/dbManager/products.js";

const viewRouter = Router();

const productManager = new Products();

//! VISTA PRODUCTS
viewRouter.get("/", async (req, res) => {
  let products = await productManager.getAllProducts();
  res.render("home", { products });
});

//! VISTA CHATS
viewRouter.get("/chats", async (req, res) => {
  res.render("chats");
});

//!VISTA CARTS
viewRouter.get("/carts", async (req, res) => {
  res.render("carts");
});

//? VISTA DETAIL PRODUCT
viewRouter.get("/product/:idProduct", async(req, res) => {
    let idProduct  = req.params.idProduct;
    try {
      let result = await productManager.getProductId(idProduct);
      res.render('product', result)
    } catch (error) {
      console.error("Producto no encontrado");
    }
})


export default viewRouter;
