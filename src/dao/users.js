import userModel from "../models/users.model.js";

export default class Users {
  constructor() {}

  //!   GET USERS
  getAllUsers = async () => {
    let result = await userModel.find().lean();
    return result;
  };

  //!   GET USER BY ID
  getUserById = async (idUser) => {
    try {
      const user = await userModel.findById(idUser);
      console.log("\u001b[1;36m User found ");
      return user;
    } catch (error) {
      console.log("\u001b[1;31m User not found");
    }
  };

  //! SAVE USER
  saveUser = async (user) => {
    let result = await userModel.create(user);
    console.log("\u001b[1;36m User create sucess");
    return result;
  };

  //!   USER DELETE
  deleteUser = async (idUser) => {
    let result = await userModel.findByIdAndDelete(idUser);
    console.log("\u001b[1;31m User Deleted");
    return result;
  };
}
