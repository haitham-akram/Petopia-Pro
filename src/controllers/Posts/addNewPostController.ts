import { addNewPost, addNewPostImage } from "../../queries/Posts";
import { type Response, type NextFunction } from "express";
import { type CustomPostRequest } from "../../interfaces/CustomRequestInterface/NewPostRequestInterface";
import PostDataValidator from "../../validation/PostDataValidator";

async function AddNewPostController(
  req: CustomPostRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { PostData } = req.body;

    const validatedPostData = await PostDataValidator(PostData);

    const NewPost = await addNewPost(validatedPostData);

    console.log(NewPost);

    res.status(201).json({
      message: `Post created successfully with ID: ${NewPost._id}`,
      data: {
        post: PostData,
      },
    });
  } catch (err) {
    console.log(err);
  }

  next();
}

export default AddNewPostController;
