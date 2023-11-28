import cartModel from "../../models/carts.model.js";

export default class Carts {
  constructor() {}

  get = async () => {
    let carts = await cartModel.find().lean();
    return carts;
  };
}
