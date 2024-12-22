import { Router } from "express";
import authenticate, { userTypes } from "../../../middlewares/auth";
import {
  addNewProductController,
  callAllProductsController,
  callOneProductsController,
  callUserProductsController,
  deleteOneProductByIdController,
  updateOldProductController,
} from "../../../controllers/products";
const { ADMIN, REGULAR } = userTypes;

const ProductRouter = Router();

// Get: get all Products with pagination, and filter sold and available products
ProductRouter.get(
  "/",
  authenticate([ADMIN, REGULAR]),
  callAllProductsController
);

// Get: get one Product using product Id
ProductRouter.get(
  "/:productId",
  authenticate([ADMIN, REGULAR]),
  callOneProductsController
);

// Get: get all user Products using User Id
ProductRouter.get(
  "/user/:userId",
  authenticate([ADMIN, REGULAR]),
  callUserProductsController
);

// Post: add new Product by user id and body data
ProductRouter.post(
  "/",
  authenticate([ADMIN, REGULAR]),
  addNewProductController
);

// Put: update one Product using product Id
ProductRouter.put(
  "/:productId",
  authenticate([ADMIN, REGULAR]),
  updateOldProductController
);

// Delete: delete one Product using product Id
ProductRouter.delete(
  "/:productId",
  authenticate([ADMIN, REGULAR]),
  deleteOneProductByIdController
);

export default ProductRouter;
