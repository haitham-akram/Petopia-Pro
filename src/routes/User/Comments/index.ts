import { Router } from "express";

import authenticate, { userTypes } from "../../../middlewares/auth";
import {
  callCommentsByPostIdController,
  addNewCommentController,
  deleteCommentController,
} from "../../../controllers/comment";
const { ADMIN, REGULAR } = userTypes;

const CommentsRouter = Router();

CommentsRouter.get("/:postId", callCommentsByPostIdController);
CommentsRouter.post(
  "/:postId",
  authenticate([ADMIN, REGULAR]),
  addNewCommentController
);

CommentsRouter.delete(
  "/:commentId",
  authenticate([ADMIN, REGULAR]),
  deleteCommentController
);
export default CommentsRouter;
