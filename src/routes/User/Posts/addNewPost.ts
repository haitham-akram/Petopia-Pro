import { Router, Request, Response } from "express";
import { addNewPostController } from "../../../controllers/Posts";

const PostsRouter = Router();

// POST: Create a new resource
PostsRouter.post("/add", addNewPostController);

export default PostsRouter;
