import { Router } from "express";
import Carts from "../dao/mongo/carts.mongo.js";

const router = Router();
const cartService = new Carts();

router.get("/", async (req, res) => {
  let result = await cartService.get();
  res.send({ result: "sucess", payload: result });
});
