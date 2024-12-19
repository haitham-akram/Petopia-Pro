import { Types } from "mongoose";
import Product from "../../database/schemas/productSchema";
import INewProdcut from "../../interfaces/NewProductInterface";

// add new Product  query
const addNewProduct = async (newProductData: INewProdcut) => {
  const newProduct = new Product(newProductData);
  return await newProduct.save();
};

export default addNewProduct;
