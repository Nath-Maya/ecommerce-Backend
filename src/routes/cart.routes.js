import { Router } from "express";
import CartDAO from "../dao/mongo/cartsDao.js";

const cartRouter = Router(); //Crear enrutador
const cartService = new CartDAO();

cartRouter.post("/", async (req, res) => {
  let newCart = req.body;
  res.send(await cartService.saveCart(newCart));
});

cartRouter.get("/", async (req, res) => {
  try {
    let carts = await cartService.getAllCart();
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al buscar carritos" + error);
  }
});

cartRouter.get("/:idCart", async (req, res) => {
  let idCart = req.params.idCart;
  try {
    let carts = await cartService.getCartId(idCart);
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Carrito no encontrado" + error);
  }
});

cartRouter.put("/:idCart", async (req, res) => {
  let { idCart } = req.params;
  let cartsToReplace = req.body;
  if (
    !cartsToReplace.description ||
    !cartsToReplace.quantity ||
    !cartsToReplace.total
  ) {
    res.send({ status: "error", error: "No hay datos en parametros" });
  }
  let result = await cartService.updateCart(idCart, cartsToReplace);
  res.send({ status: "sucess", payload: result });
});

cartRouter.delete("/:idCart", async (req, res) => {
  let idCart = req.params.idCart;
  try {
    let carts = await cartService.deleteCart(idCart);
    console.log("\u001b[1;34m Carrito eliminado" + error);
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al eliminar carrito " + error);
  }
});

cartRouter.post("/:idCart/products/:idProducts", async (req, res) => {
  let idCart = req.params.idCart;
  let idProduct = req.params.idProducts;
  try {
    let carts = await cartService.insertProductCart(idCart, idProduct);
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al insertar producto al carrito " + error);
  }
});

cartRouter.put("/:idCart/products/:idProduct", async (req, res) => {
  let idCart = req.params.idCart;
  let idProduct = req.params.idProduct;
  let newQuantity = req.body.quantity;

  try {
    const result = await cartService.updateProductCart(
      idCart,
      idProduct,
      newQuantity
    );
    res.send({ result: "sucess", payload: result });
  } catch (error) {
    console.log(
      "\u001b[1;34m Error al actualizar cantidad de producto en el carrito " +
        error
    );
  }
  const result = await cartService.updateProductCart(
    idCart,
    idProduct,
    newQuantity
  );
  res.send({ result: "sucess", payload: result });
});

cartRouter.delete("/:idCart/products/:idProducts", async (req, res) => {
  let idCart = req.params.idCart;
  let idProduct = req.params.idProduct;
  res.send(await cartService.deleteProductCart(idCart, idProduct));
});

export default cartRouter;

cartRouter.delete("/:idCart/products", async (req, res) => {
  let idCart = req.params.idCart;
  res.send(await cartService.deleteAllProductsCart(idCart));
});
