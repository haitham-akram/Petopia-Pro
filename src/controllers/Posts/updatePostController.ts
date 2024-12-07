import { type Response, type NextFunction, type Request } from "express";
import {
  callOnePostById,
  UpdatePostById,
  ReplacePostById,
} from "../../queries/Posts";
import IUpdatePost from "../../interfaces/PostUpdateDataInterface";
import CustomError from "../../helpers/CustomError";
import { callOneProductById } from "../../queries/Product";
import { callOnePetById } from "../../queries/Pet";
import Product from "../../database/schemas/productSchema";
import UpdateAttachedData from "../../helpers/UpdatePostAttachedData";
import PostUpdateDataValidator from "../../validation/PostUpdateDataValidator";

async function updatePostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const NewPostData = req.body.NewPostData as IUpdatePost;
    const postId = req.params.postId as string;

    const validatedUpdatedData = await PostUpdateDataValidator(NewPostData);

    if (!validatedUpdatedData) {
      res.status(204).json({
        message: "You didn't add new data, No post has been updated.",
      });
    }

    const PostData = await callOnePostById({ postId });

    if (!PostData) {
      res.status(202).json({
        message: "No post to updated.",
      });
    }

    const { status, message, AttachedData } = await UpdateAttachedData({
      NewPostData,
      PostData,
    });

    // console.log(status, message);

    if (status) {
      res.status(status).json(message);
    }

    const PostNewData = { ...PostData?._doc, ...NewPostData };

    const UpdatedPostData = await ReplacePostById({
      PostId: postId,
      PostNewData,
    });

    console.log(PostNewData);

    if (!UpdatedPostData) {
      res.status(202).json({
        message: "Something went wrong.",
      });
    }

    res.status(202).json({
      message: "The post has been updated.",
      UpdatedPostData,
      ...AttachedData,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }
  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default updatePostController;
