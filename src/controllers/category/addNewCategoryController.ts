import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { addNewCategory } from "../../queries/category";

async function template(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const { NewCategory } = req.body;

    console.log(NewCategory)

    const newCategory = await addNewCategory(NewCategory);

    res.status(201).json({
      message: `Category have been created successfully with ID: ${NewCategory.id}`,
      data: {
        newCategory,
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
