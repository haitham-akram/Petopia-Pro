import { addNewPost } from "../../queries/posts";
import { type Response, type NextFunction } from "express";
import PostDataValidator from "../../validation/post/postDataValidator";
import PostAttachedData from "../../helpers/postAttachedData";
import { type CustomRequest } from "../../interfaces/iUser";
import INewPost from "../../interfaces/NewPostInterface";

// All Done and Tested ✅
async function AddNewPostController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { PostData }: { PostData: INewPost } = req.body;

    PostData.userId = req.user?.id.toString()!;

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
