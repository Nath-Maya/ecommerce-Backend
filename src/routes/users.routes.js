import { Router } from "express";
import Users from "../dao/users.js";

const usersRouter = Router();
const userManager = new Users();

//!   GET USERS
//Consultar los usuarios registrados
usersRouter.get("/", async (req, res) => {
  let users = await userManager.getAllUsers();
  res.send(users);
});

//!   GET USER BY ID
//Consulta de un usuario en especifico
usersRouter.get("/:idUser", async (req, res) => {
  let idUser = req.params.idUser;
  try {
    let result = await userManager.getUserById(idUser);
    res.send({ status: "sucess", payload: result });
  } catch (error) {
    console.error("User not found");
  }
});

//!   DELETE USER
//Eliminar un usuario con el id.
usersRouter.delete("/:idUser", async (req, res) => {
  let { idUser } = req.params;
  let result = await userManager.deleteUser(idUser);
  res.send("User deleted");
});

export default usersRouter;
