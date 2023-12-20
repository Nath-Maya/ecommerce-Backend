import { Router } from "express";
import Products from "../dao/products.js.js.js.js";

const viewRouter = Router();

const productManager = new Products();

//! VISTA PRODUCTS
viewRouter.get("/products", async (req, res) => {
  let products = await productManager.getAllProducts();
  let user = req.session.user;
  res.render("home", { products, user });
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
  if (req.session.user) res.redirect("/products");
  res.render("login");
});

viewRouter.get("/", (req, res) => {
  if (!req.session.user) res.redirect("/login");
  res.render("profile", { user: req.session.user });
});

viewRouter.get("/reset", async (req, res) => {
  res.render("reset");
});

export default viewRouter;
