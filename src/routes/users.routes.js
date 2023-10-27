import { Router } from "express";
import userModel from "../models/users.model.js";

const usersRouter = Router();

//! GET USERS
//Consultar los usuarios registrados
usersRouter.get("/", async (req, res) => {
  let users = await userModel.find().lean();
  res.send(users);
});

//! GET USER BY ID
//Consulta de un usuario en especifico



export default usersRouter;
