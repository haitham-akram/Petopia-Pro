import { type Response, type NextFunction, type Request } from "express";
import { callAllProducts } from "../../queries/product";

async function callAllProductsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { index, limit, filter, sort, inStock } = req.query;

    const allProducts = await callAllProducts(
      index as string,
      limit as string,
      { filter, sort, inStock } as {
        filter: string;
        sort: string;
        inStock: string;
      }
    );

    if (!allProducts)
      res.status(200).json({
        massega: "There is no products to call.",
      });

    res.status(200).json({
      massega: "Products have been called.",
      count: allProducts.length,
      allProducts,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default callAllProductsController;
