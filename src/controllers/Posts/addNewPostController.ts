import { addNewPost } from "../../queries/Posts";
import { type Response, type NextFunction, type Request } from "express";
import PostDataValidator from "../../validation/PostDataValidator";
import IPost from "../../interfaces/PostDataInterface";
import PostAttachedData from "../../helpers/PostAttachedData";

async function AddNewPostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { PostData }: { PostData: IPost } = req.body;

    const validatedPostData = await PostDataValidator(PostData);
    let NewPost;
    let AttachedData = {
      PetData: {},
      ProductData: {},
    };

    // console.log(validatedPostData)
    const { ReadyPostData, ReadyAttachedData } = await PostAttachedData(
      validatedPostData,
      PostData,
      AttachedData
    );

    NewPost = await addNewPost(ReadyPostData);

    res.status(201).json({
      message: `Post created successfully with ID: ${NewPost._id}`,
      data: {
        PostData: NewPost,
        ...ReadyAttachedData,
      },
    });
  } catch (err) {
    next(err);
  }
}

export default AddNewPostController;
