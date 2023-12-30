import { Router } from "express";
import ProductDAO from "../../daos/mongo/product.mongo.dao";

const router = Router();
const productService = new ProductDAO();

router.get("/product", async (req, res) => {
 // try {
    const products= await productService.getAllProducts();
    //const user = req.session.user;
    //console.log( user + 'lego el usuerio ')
   res.render("products", { products });
 /* } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).render("error", { error: "Error al obtener productos" });
  }*/
});

router.get("/chats", (req, res) => {
  res.render("chats");
});

router.get("/carts", (req, res) => {
  res.render("carts");
});

router.get("/products/:idProduct", async (req, res) => {
  const idProduct = req.params.idProduct;

  try {
    const result = await productService.getProductId(idProduct);
    res.render("product", result);
  } catch (error) {
    console.error(`Error al obtener producto con ID ${idProduct}:`, error);
    res
      .status(500)
      .render("error", {
        error: `Error al obtener producto con ID ${idProduct}`,
      });
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.redirect("/product");
  } else {
    res.render("login"); 
  }
});

router.get("/profile", (req, res) => {
  if (req.session.user) {
    res.render("profile", { user: req.session.user });
  } else {
    res.redirect("/login");
  }
});

router.get("/", (req, res) => {
    res.render("login")
  
});
router.get("/reset", (req, res) => {
  res.render("reset"); 
});

export default router;
