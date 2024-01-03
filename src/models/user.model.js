import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  cartId: {type: Schema.Types.ObjectId,ref: "carts"},
  role: {
    type: String,
    default: "user",
  },
});

export default model("users", usersSchema);
