import userModel from "./mongo/models/users.model.js.js";

export default class Users {
  constructor() {}

  getAllUsers = async () => {
    let result = await userModel.find().lean();
    return result;
  };


  getUserById = async (idUser) => {
    try {
      const user = await userModel.findById(idUser);
      console.log("\u001b[1;36m User found ");
      return user;
    } catch (error) {
      console.log("\u001b[1;31m User not found");
    }
  };


  saveUser = async (user) => {
    let result = await userModel.create(user);
    console.log("\u001b[1;36m User create sucess");
    return result;
  };


  deleteUser = async (idUser) => {
    let result = await userModel.findByIdAndDelete(idUser);
    console.log("\u001b[1;31m User Deleted");
    return result;
  };
}
