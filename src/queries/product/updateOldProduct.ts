import Product from "../../database/schemas/productSchema";
import IUpdateProduct from "../../interfaces/UpdateProductInterface";

// update old Product query
const updateOldProduct = async (
  productId: string,
  userId: string,
  updatePostData: IUpdateProduct
) => {
  const updatedPost = Product.findOneAndUpdate(
    { _id: productId, userId },
    { $set: updatePostData }
  );
  return await updatedPost;
};

export default updateOldProduct;
