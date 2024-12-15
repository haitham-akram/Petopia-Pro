import { Router } from "express";

import authenticate, { userTypes } from "../../../middlewares/auth";
import addNewCommentController from "../../../controllers/comment/addNewCommentController";
import callCommentsByPostIdControllers from "../../../controllers/comment/callCommentsByPostIdControllers";
const { ADMIN, REGULAR } = userTypes;

const CommentsRouter = Router();

// GET: Call Comments using Post Id
CommentsRouter.get("/:postId", callCommentsByPostIdControllers);
// CommentsRouter.get("/:postId", (req) => console.log(req.params.postId));

// Get: Posts of one user using UserId
// CommentsRouter.get("/user/:userId?", callPostsController);

// Get: Create a new comment
CommentsRouter.post(
  "/:postId",
  authenticate([ADMIN, REGULAR]),
  addNewCommentController
);

// Put: Update old post
// CommentsRouter.put(
//   "/:postId",
//   authenticate([ADMIN, REGULAR]),
//   updatePostController
// );

// CommentsRouter.delete(
//   "/:postId",
//   authenticate([ADMIN, REGULAR]),
//   deletePostsByIDController
// );

export default CommentsRouter;
