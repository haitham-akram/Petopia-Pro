import { Router } from "express";
import { updateikeController } from "../../../controllers/like";
import authenticate, { userTypes } from "../../../middlewares/auth";
const { ADMIN, REGULAR } = userTypes;

const likeRouter = Router();

likeRouter.post(
  "/:relateId",
  authenticate([ADMIN, REGULAR]),
  updateikeController
);

export default likeRouter;
