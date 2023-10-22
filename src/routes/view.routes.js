import { Router } from "express";
import Products from "../dao/products.js";

const viewRouter = Router();

const productManager = new Products();

//! VISTA PRODUCTS
viewRouter.get("/products", async (req, res) => {
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
viewRouter.get("/product/:idProduct", async (req, res) => {
  let idProduct = req.params.idProduct;

  let result = await productManager.getProductId(idProduct);
  res.render("product", result);
});

//* VISTA REGISTRO Y LOGIN
viewRouter.get("/register", (req, res) => {
  res.render("register");
});

viewRouter.get("/", (req, res) => {
  res.render("login");
});

viewRouter.get("/", (req, res) => {
  res.render("profile", {
    user: req.session.user,
  });
});

export default viewRouter;
