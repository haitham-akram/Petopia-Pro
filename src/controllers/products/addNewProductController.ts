import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import productDataValidator from "../../validation/product/newProductDataValidator";
import { addNewProduct } from "../../queries/product";
import INewProdcut from "../../interfaces/NewProductInterface";

async function addNewProductController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { newProductData } = req.body;
    const userId = req.user!.id;

    newProductData.userId = userId;

    const validatedProductData = await productDataValidator(
      newProductData as INewProdcut
    );

    const newProduct = await addNewProduct(validatedProductData);

    res
      .status(201)
      .json({ massega: "Product have been added correctly.", newProduct });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default addNewProductController;
