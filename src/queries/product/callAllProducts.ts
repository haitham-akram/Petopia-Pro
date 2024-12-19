import Product from "../../database/schemas/productSchema";
import { filterDataCompiler } from "../../helpers/filterDataCompiler";

// call all Products query
const callOneProductById = async (
  index: string | number = "0",
  limit: string | number = "5",
  { filter, sort, inStock }: { filter: any; sort: string; inStock: string }
) => {
  const indexNum = Number(index);
  const limitNum = Number(limit);

  index = indexNum > 0 ? indexNum : 0;
  limit = limitNum > 0 || limitNum < 21 ? limitNum : 5;

  const { filterQuery, sortQuery } = filterDataCompiler({
    filter,
    sort,
    inStock,
  });

  const calledProduct = await Product.find()
    .where(filterQuery)
    .sort(sortQuery)
    .skip(index * limit)
    .limit(limit)
    .populate("userId", "-_id fullName email uesrImage");
  return calledProduct;
};

export default callOneProductById;
