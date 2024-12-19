import { Types } from "mongoose";
import Product from "../../database/schemas/productSchema";

// call all user Products query
const callAllProductsByUserId = async (
  userId: Types.ObjectId | string,
  index: string | number = "0",
  limit: string | number = "5"
) => {
  const indexNum = Number(index);
  const limitNum = Number(limit);

  index = indexNum > 0 ? indexNum : 0;
  limit = limitNum > 0 || limitNum < 21 ? limitNum : 5;

  const calledUserProducts = await Product.find({ userId })
    .skip(index * limit)
    .limit(limit);
  return calledUserProducts;
};

export default callAllProductsByUserId;
