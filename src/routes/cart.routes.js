import { Router } from "express";
import CartDAO from "../dao/mongo/cartsDao.js";
import { isUser } from "../middlewares/auth.middleware.js";

const router = Router();
const cartService = new CartDAO();

router.post("/", async (req, res) => {
  try {
    const newCart = req.body;
    const result = await cartService.saveCart(newCart);
    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al guardar el carrito:", error.message);
    res.status(500).json({ result: "error", error: "Error al guardar el carrito" });
  }
});

router.get("/", async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json({ result: "success", payload: carts });
  } catch (error) {
    console.error("Error al buscar carritos:", error.message);
    res.status(500).json({ result: "error", error: "Error al buscar carritos" });
  }
});

router.get("/:idCart", async (req, res) => {
  const idCart = req.params.idCart;
  try {
    const cart = await cartService.getCartId(idCart);
    res.json({ result: "success", payload: cart });
  } catch (error) {
    console.error("Carrito no encontrado:", error.message);
    res.status(404).json({ result: "error", error: "Carrito no encontrado" });
  }
});

router.put("/:idCart", async (req, res) => {
  const idCart = req.params.idCart;
  const cartsToReplace = req.body;

  try {
    if (!cartsToReplace.description || !cartsToReplace.quantity || !cartsToReplace.total) {
      res.status(400).json({ result: "error", error: "No hay datos en parámetros" });
      return;
    }

    const result = await cartService.updateCart(idCart, cartsToReplace);
    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al actualizar el carrito:", error.message);
    res.status(500).json({ result: "error", error: "Error al actualizar el carrito" });
  }
});

router.delete("/:idCart", async (req, res) => {
  const idCart = req.params.idCart;
  try {
    const result = await cartService.deleteCart(idCart);
    console.log("\u001b[1;34m Carrito eliminado");
    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al eliminar el carrito:", error.message);
    res.status(500).json({ result: "error", error: "Error al eliminar el carrito" });
  }
});

router.post("/:idCart/products/:idProduct",isUser, async (req, res) => {
  const idCart = req.params.idCart;
  const idProduct = req.params.idProduct;
  try {
    const result = await cartService.insertProductCart(idCart, idProduct);
    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al insertar producto en el carrito:", error.message);
    res.status(500).json({ result: "error", error: "Error al insertar producto en el carrito" });
  }
});

router.put("/:idCart/products/:idProduct",isUser, async (req, res) => {
  const idCart = req.params.idCart;
  const idProduct = req.params.idProduct;
  const newQuantity = req.body.quantity;

  try {
    const result = await cartService.updateProductCart(idCart, idProduct, newQuantity);
    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al actualizar cantidad de producto en el carrito:", error.message);
    res.status(500).json({ result: "error", error: "Error al actualizar cantidad de producto en el carrito" });
  }
});

router.delete("/:idCart/products/:idProduct", isUser, async (req, res) => {
  const idCart = req.params.idCart;
  const idProduct = req.params.idProduct;

  try {
    const result = await cartService.deleteProductCart(idCart, idProduct);
    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error.message);
    res.status(500).json({ result: "error", error: "Error al eliminar producto del carrito" });
  }
});

router.delete("/:idCart/products", async (req, res) => {
  const idCart = req.params.idCart;
  try {
    const result = await cartService.deleteAllProductsCart(idCart);
    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al eliminar todos los productos del carrito:", error.message);
    res.status(500).json({ result: "error", error: "Error al eliminar todos los productos del carrito" });
  }
});

export default router;
