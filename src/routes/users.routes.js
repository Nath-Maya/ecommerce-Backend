import { Router } from "express";
import userModel from "../models/users.model.js";

const usersRouter = Router();

//! GET USERS

usersRouter.get("/", async (req, res) => {
  let users = await userModel.find().lean();
  res.send(users);
});


export default usersRouter;
