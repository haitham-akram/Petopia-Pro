import Product from "../../database/schemas/productSchema";

// call old Product by query with user data lookup
const callOneProductById = async (productId: string, userId: string) => {
  const deletedProduct = await Product.findOneAndDelete({
    _id: productId,
    userId,
  });
  return deletedProduct;
};

export default callOneProductById;
