import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router();
const carts = new CartManager();

CartRouter.post("/", async (req, res) => {
  res.send(await carts.addCartProd()); 
});

CartRouter.get("/", async (req, res) => {
  res.send(await carts.readCart());
});

export default CartRouter;
