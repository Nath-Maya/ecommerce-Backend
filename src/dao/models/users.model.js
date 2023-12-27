import mongoose from "mongoose";

const userCollection = "Users";
const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: String,
  password: String,
  rol: {
    type: String,
    
    enum: ["usuario", "admin"],
    default: "admin",
  },
  cartId: { type: mongoose.SchemaTypes.ObjectId, ref: "carts" },
  documents:[{
    name: String,
    reference:String
  }],
  last_connection:{type:Date}
});
const userModel = mongoose.model(userCollection, userSchema);
export default userModel;
