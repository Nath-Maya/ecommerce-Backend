import { Router } from "express";
import Cart from "../DAO/dbManager/carts.js";

const cartRouter = Router(); //Crear enrutador
const cartManager = new Cart();

//**** POST CART*/
cartRouter.post("/", async (req, res) => {

  let newCart = req.body
  res.send(await cartManager.saveCart(newCart))
});

//**** GET CART*/
cartRouter.get("/", async (req, res) => {

  try {
    let carts = await cartManager.getAllCart(); //Buscar en el modelo de usuario
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al buscar carritos" + error);
  }
});

//**** GET CART BY ID */
cartRouter.get("/:idCart", async (req, res) => {

  let idCart = req.params.idCart;
  try {
    let carts = await cartManager.getCartId(idCart);
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Carrito no encontrado" + error)
  }
});

//**** UPDATE */
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
  let result = await cartManager.updateCart(idCart, cartsToReplace);
  res.send({ status: "sucess", payload: result });
});

//**** DELETE CART */
cartRouter.delete("/:idCart", async (req,res) => {

  let idCart = req.params.idCart;
  try {
    let carts = await cartManager.deleteCart(idCart);
    console.log("\u001b[1;34m Carrito eliminado" + error);
    res.send({ result: "sucess", payload: carts });
  } catch (error) {
    console.log("\u001b[1;34m Error al eliminar carrito del carrito " + error);
  }
})


//! DELETE PRODUCT IN CART
cartRouter.delete("/:idCart", async (req, res) => {
  let idCart = req.params.idCart;
  let idProduct = req.params.idProduct;
  res.send(await carts.deleteProductCart(idCart, idProduct));
});

export default cartRouter;
