import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router();
const carts = new CartManager();

CartRouter.post("/", async (req, res) => {
  res.send(await carts.addCartProd);
});


export default CartRouter;
