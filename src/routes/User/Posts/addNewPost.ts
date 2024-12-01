import { Router, Request, Response } from "express";
import { addNewPostController } from "../../../controllers/Posts";

const PostsRouter = Router();

// POST: Create a new resource
PostsRouter.post("/add", async (req: Request, res: Response) => {
  try {
    const { PostData, PostImageData } = req.body; // Parse incoming request body
    const newPost = await addNewPostController({ PostData , PostImageData });

    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export default PostsRouter;
