import { type Response, type NextFunction, type Request } from "express";
import { callProductsByUserId } from "../../queries/product";
import CustomError from "../../helpers/CustomError";

async function callUserProductsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params!.userId as string;

    const userProducts = await callProductsByUserId(userId);

    if (userProducts.length === 0) {
      throw new CustomError(404, "There is not Products to show.");
    }

    res.status(200).json({
      message: "The user Products.",
      count: userProducts.length,
      userProducts,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default callUserProductsController;
