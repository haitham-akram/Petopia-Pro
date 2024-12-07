import { Router } from "express";
import {
  addNewPostController,
  callPostByIdController,
  updatePostController,
  // searchPostController,
} from "../../../controllers/Posts";

const PostsRouter = Router();

// POST: Create a new resource
PostsRouter.post("/", addNewPostController);
PostsRouter.put("/:postId", updatePostController);
// PostsRouter.get("/search", searchPostController);
PostsRouter.get("/:postId", callPostByIdController);

export default PostsRouter;
