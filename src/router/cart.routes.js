import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router();
const carts = new CartManager();

CartRouter.post("/", async (req, res) => {
  res.send(await carts.addCart()); 
});

CartRouter.get("/", async (req, res) => {
  res.send(await carts.readCart());
});
 
CartRouter.get("/:id", async (req, res) => {
   res.send(await carts.getCartd(req.params.id));
 });

 CartRouter.post("/:cid/products/:pid", async (req, res) => {
   let cartId = req.params.cid;
   let productId = req.params.pid;
   res.send(await carts.addProductCart(cartId, productId));
})

export default CartRouter;
