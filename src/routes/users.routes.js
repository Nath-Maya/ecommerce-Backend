import { Router } from "express";
import UsersDAO from "../dao/mongo/usersDao.js";

const router = Router();
const userService = new UsersDAO();

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send({ status: "error", error: "Error al obtener usuarios" });
  }
});

router.get("/:idUser", async (req, res) => {
  const idUser = req.params.idUser;
  try {
    const result = await userService.getUserById(idUser);
    if (result) {
      res.send({ status: "success", payload: result });
    } else {
      res.status(404).send({ status: "error", error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    res.status(500).send({ status: "error", error: "Error al obtener usuario por ID" });
  }
});

router.delete("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    const result = await userService.deleteUser(idUser);
    if (result) {
      res.send({ status: "success", payload: "Usuario eliminado" });
    } else {
      res.status(404).send({ status: "error", error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).send({ status: "error", error: "Error al eliminar usuario" });
  }
});

export default router;
