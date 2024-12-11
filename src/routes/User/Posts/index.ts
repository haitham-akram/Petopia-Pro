import { Router } from "express";
import {
  addNewPostController,
  callPostByIdController,
  updatePostController,
  callPostsController,
  // searchPostController,
} from "../../../controllers/Posts";

const PostsRouter = Router();

// POST: Create a new resource
PostsRouter.get("/:postId", callPostByIdController);
PostsRouter.get("/user/:userId?", callPostsController);
PostsRouter.post("/", addNewPostController);
PostsRouter.put("/:postId", updatePostController);
// PostsRouter.get("/search", searchPostController);

export default PostsRouter;
