import messageModel from "../models/messages.model.js"

export default class MessageDAO {
  constructor() {}


  sendMessage = async (message) => {
    let result = await messageModel.create(message);
    console.log("\u001b[1;36m Mensaje guardado");
    return result;
  };


  getAllMessage = async () => {
    let result = await messageModel.find().lean();
    return result;
  };
}