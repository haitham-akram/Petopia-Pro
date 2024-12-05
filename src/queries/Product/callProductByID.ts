import { Types } from "mongoose";
import Product from "../../database/schemas/productSchema";

// call old Product by query
const callOneProductById = async (productId: Types.ObjectId | string) => {
  const calledProduct = await Product.findById(productId.toString());
  return calledProduct;
};

export default callOneProductById;
