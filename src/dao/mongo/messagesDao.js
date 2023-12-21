import messageModel from "../models/messages.model.js";

export default class MessageDAO {
  constructor() {}

  sendMessage = async (message) => {
    try {
      let result = await messageModel.create(message);
      return result;
    } catch (error) {
      console.error("Error al guardar el mensaje:", error.message);
      throw new Error("Error al guardar el mensaje");
    }
  };

  getAllMessages = async () => {
    try {
      let result = await messageModel.find().lean();
      return result;
    } catch (error) {
      console.error("Error al obtener mensajes:", error.message);
      throw new Error("Error al obtener mensajes");
    }
  };
}
