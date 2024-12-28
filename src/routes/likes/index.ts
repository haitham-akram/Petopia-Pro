import { Router } from "express";
import {
  callAllLikeController,
  callUserLikesController,
  updateikeController,
} from "../../controllers/like";
import authenticate, { userTypes } from "../../middlewares/auth";
const { ADMIN, REGULAR } = userTypes;

const likeRouter = Router();

likeRouter.get("/", authenticate([ADMIN, REGULAR]), callUserLikesController);

likeRouter.get(
  "/:relateId",
  callAllLikeController
);

likeRouter.put(
  "/:relateId",
  authenticate([ADMIN, REGULAR]),
  updateikeController
);

export default likeRouter;
