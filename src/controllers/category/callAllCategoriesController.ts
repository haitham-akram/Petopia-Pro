import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { callAllCategories } from "../../queries/category";

async function template(__req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const categoriesData = await callAllCategories();

    res.status(201).json({
      message: `All categories are called`,
      data: {
        count: categoriesData.length,
        categoriesData,
      },
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default template;
