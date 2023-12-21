import { Router } from "express";
import Products from "../dao/products.js";

const viewRouter = Router();

const productManager = new Products();

viewRouter.get("/products", async (req, res) => {
  let products = await productManager.getAllProducts();
  let user = req.session.user;
  res.render("home", { products, user });
});

viewRouter.get("/chats", async (req, res) => {
  res.render("chats");
});

viewRouter.get("/carts", async (req, res) => {
  res.render("carts");
});

viewRouter.get("/product/:idProduct", async (req, res) => {
  let idProduct = req.params.idProduct;

  let result = await productManager.getProductId(idProduct);
  res.render("product", result);
});

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
