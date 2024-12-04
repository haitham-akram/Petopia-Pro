import Product from "../../database/schemas/petSchema";

// call old Product by query
const callOneProductById = async ({ productId }: { productId: string }) => {
  const calledProduct = Product.findById(productId);
  return await calledProduct;
};

export default callOneProductById;
