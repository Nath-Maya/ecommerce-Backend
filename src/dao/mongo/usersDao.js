import userModel from "../models/users.model.js";

export default class UsersDAO {
  constructor() {}

  getAllUsers = async () => {
    try {
      let result = await userModel.find().lean();
      return result;
    } catch (error) {
      console.error("Error al obtener usuarios:", error.message);
      throw new Error("Error al obtener usuarios");
    }
  };

  getUserById = async (idUser) => {
    try {
      const user = await userModel.findById(idUser);
      console.log("\u001b[1;36m User found ");
      return user;
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error.message);
      throw new Error("Error al obtener usuario por ID");
    }
  };

  saveUser = async (user) => {
    try {
      let result = await userModel.create(user);
      console.log("\u001b[1;36m User create success");
      return result;
    } catch (error) {
      console.error("Error al crear usuario:", error.message);
      throw new Error("Error al crear usuario");
    }
  };

  deleteUser = async (idUser) => {
    try {
      let result = await userModel.findByIdAndDelete(idUser);
      console.log("\u001b[1;31m User Deleted");
      return result;
    } catch (error) {
      console.error("Error al eliminar usuario:", error.message);
      throw new Error("Error al eliminar usuario");
    }
  };
}
