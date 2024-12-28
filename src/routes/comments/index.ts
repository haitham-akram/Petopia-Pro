import { Router } from "express";

import authenticate, { userTypes } from "../../middlewares/auth";
import {
  callCommentsByPostIdController,
  addNewCommentController,
  deleteCommentController,
  updateCommentController,
} from "../../controllers/comment";
const { ADMIN, REGULAR } = userTypes;

const CommentsRouter = Router();

// Get: call comment for one post using it's own Id
CommentsRouter.get("/:postId", callCommentsByPostIdController);

// Put: update comment using the id of it's and the user id
CommentsRouter.put(
  "/:commentId",
  authenticate([ADMIN, REGULAR]),
  updateCommentController
);

// Post: add new post by the user id
CommentsRouter.post(
  "/:postId",
  authenticate([ADMIN, REGULAR]),
  addNewCommentController
);

// Delete: the comment using the comment id and the user id
CommentsRouter.delete(
  "/:commentId",
  authenticate([ADMIN, REGULAR]),
  deleteCommentController
);
export default CommentsRouter;
