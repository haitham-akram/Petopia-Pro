import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import CustomError from "../../helpers/CustomError";
import { deleteOneProductById } from "../../queries/product";

async function deleteOneProductByIdController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.productId as string;
    const userId = req.userInfo!.id as string;

    const deletedProduct = await deleteOneProductById(productId, userId);

    if (!deletedProduct)
      throw new CustomError(404, "The product does not exists.");

    res.status(200).json({
      message: "The product have been updated.",
      deletedProduct,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default deleteOneProductByIdController;
