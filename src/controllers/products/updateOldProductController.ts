import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import IUpdateProdcut from "../../interfaces/UpdateProductInterface";
import CustomError from "../../helpers/CustomError";
import updateProductDataValidator from "../../validation/product/updateProductDataValidator";
import { updateOldProduct } from "../../queries/product";

async function updateOldProductController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.productId as string;
    const userId = req.user!.id as string;
    const { productData } = req.body as { productData: IUpdateProdcut };

    const validatedUpdateProdductData = await updateProductDataValidator(
      productData
    );

    const updatedProductData = await updateOldProduct(
      productId,
      userId,
      validatedUpdateProdductData
    );

    if (!updatedProductData)
      throw new CustomError(404, "The product does not exists.");

    res.status(200).json({
      message: "The product have been updated.",
      updatedProductData,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default updateOldProductController;
