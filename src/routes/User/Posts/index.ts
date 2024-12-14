import { Router } from "express";
import {
  addNewPostController,
  callPostByIdController,
  updatePostController,
  callPostsController,
  deletePostsByIDController,
} from "../../../controllers/posts";
import authenticate, { userTypes } from "../../../middlewares/auth";
const { ADMIN, REGULAR } = userTypes;

const PostsRouter = Router();

// POST: Create a new resource
PostsRouter.get("/:postId", callPostByIdController);

// Get: Posts of one user using UserId
PostsRouter.get("/user/:userId?", callPostsController);

// Get: Create a new post
PostsRouter.post("/", authenticate([ADMIN, REGULAR]), addNewPostController);

// Put: Update old post
PostsRouter.put(
  "/:postId",
  authenticate([ADMIN, REGULAR]),
  updatePostController
);

PostsRouter.delete(
  "/:postId",
  authenticate([ADMIN, REGULAR]),
  deletePostsByIDController
);

export default PostsRouter;
