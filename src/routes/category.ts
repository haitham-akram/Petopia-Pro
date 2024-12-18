import { Router } from "express";
import {
  addNewCategoryController,
  callAllCategoriesController,
  callCategoryByIdController,
} from "../controllers/category";
import authenticate, { userTypes } from "../middlewares/auth";

const { ADMIN } = userTypes;

const CategoryRouter = Router();

CategoryRouter.post("/", authenticate([ADMIN]), addNewCategoryController);
CategoryRouter.get("/", callAllCategoriesController);
CategoryRouter.get("/:categoryId", callCategoryByIdController);

export default CategoryRouter;
