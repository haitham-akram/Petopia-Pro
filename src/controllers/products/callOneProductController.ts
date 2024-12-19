import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { callOneProductById } from "../../queries/product";
import CustomError from "../../helpers/CustomError";

async function callOneProductsController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const productId = req.params.productId as string;

    const productData = await callOneProductById(productId);

    if (!productData)
      next(new CustomError(404, "There is no Product with this ID."));

    res.status(200).json({
      message: "This the product you asked for.",
      productData,
    });
  } catch (err) {
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default callOneProductsController;
