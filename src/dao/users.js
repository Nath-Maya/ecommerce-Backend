import userModel from "../models/users.model.js";

export default class Users {
   constructor() {}

   //!   GET USERS
   getAllUsers = async () => {
      let result = await userModel.find().lean();
      return result
   
   }

   //!   GET USER BY ID
   getUserById = async (idUser) => {
      try {
         const user = await userModel.findById(idUser);
         console.log("\u001b[1;36m User found ");
         return user;
      } catch (error) {
         console.log("\u001b[1;31m User not found");
      }
   }

   //!   GET USER DELETE
   deleteUser = async (idUser) => {
      try {
         let result = await userModel.deleteOne({__id: `${ idUser }`});
         console.log("\u001b[1;31m User Deleted");
         return result;
      } catch (error) {
         
      }
   
   
   
   }











}