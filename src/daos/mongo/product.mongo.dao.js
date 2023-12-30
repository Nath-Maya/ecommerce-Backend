import BaseMongoDao from "./base.mongo.dao.js";
import productsModel from "../../models/product.model.js";
export class ProductMongoDao extends BaseMongoDao {
  constructor() {
    super(productsModel);
  }
  async getAll(limit, page, sort, query) {
    try {
     
      const filter = query ? { title: { $regex: query, $options: "i" } } : {};
      
      const all = await this.db.paginate(filter, {
        limit: limit || 10,
        page: page || 1,
        sort: sort || {},
        lean: true,
      });
      return all;
    } catch (err) {
      throw new Error(err);
    }
  }
}
