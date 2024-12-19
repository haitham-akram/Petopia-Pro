import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { callOneCategory } from "../../queries/category";
import CustomError from "../../helpers/CustomError";

async function template(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const { categoryId } = req.params;

    const categoryData = await callOneCategory(Number(categoryId));

    if (!categoryData) throw new CustomError(404, "No category found");

    res.status(201).json({
      message: `Category with title: ${categoryData?.title} are called`,
      data: {
        categoryData,
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
