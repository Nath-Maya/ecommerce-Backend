import { Router } from "express";
import MessageDAO from "../dao/mongo/messagesDao.js";
import viewRouter from "./view.routes.js";
import { isUser } from "../middlewares/auth.middleware.js";

const router = Router();
const messageService = new MessageDAO();

router.post("/",isUser, async (req, res) => {
  try {
    const { user, message } = req.body;

    if (!message) {
      res.status(400).json({ status: "error", error: "Faltan datos en los parámetros" });
      return;
    }

    const authenticatedUser = req.session.user;

    const newMessage = {
      user: authenticatedUser.username,
      message: message
    };

    const result = await messageService.sendMessage(newMessage);
    res.json({ status: "success", payload: result });
  } catch (error) {
    console.error("Error en la ruta POST /messages:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta POST /messages" });
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await messageService.getAllMessages();
    res.json({ status: "success", payload: messages });
  } catch (error) {
    console.error("Error en la ruta GET /messages:", error);
    res.status(500).json({ status: "error", error: "Error en la ruta GET /messages" });
  }
});

export default router;
