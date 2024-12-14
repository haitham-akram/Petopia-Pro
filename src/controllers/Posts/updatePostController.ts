import { type Response, type NextFunction } from "express";
import {
  callOnePostById,
  // updatePostById,
  replacePostById,
} from "../../queries/posts";
import IUpdatePost from "../../interfaces/PostUpdateDataInterface";
import UpdateAttachedData from "../../helpers/updatePostAttachedData";
import PostUpdateDataValidator from "../../validation/post/postUpdateDataValidator";
import { type CustomRequest } from "../../interfaces/iUser";

// All Done and tested ✅
async function updatePostController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // collect data
    const NewPostData = req.body.NewPostData as IUpdatePost;
    const postId = req.params.postId as string;
    const userId = req.user?.id;

    // validate data
    const validatedUpdatedData = await PostUpdateDataValidator(NewPostData);

    if (!validatedUpdatedData) {
      res.status(204).json({
        message: "You didn't add new data, No post has been updated.",
      });
    }

    // call old post
    const PostData = await callOnePostById({ postId });

    if (!PostData) {
      res.status(404).json({
        message: "No post to updated.",
      });
    }

    if (PostData.userId.toString() !== userId) {
      res.status(401).json({
        message: "Not authorized operation.",
      });
    }

    // update attached data and thier IDes (if it's exist)
    const { status, message, AttachedData, postDataEdited } =
      await UpdateAttachedData({
        NewPostData,
        PostData,
      });

    if (status) {
      res.status(status).json(message);
    }
    const PostNewData = { ...PostData?._doc, ...postDataEdited };

    switch (postDataEdited?.categoryId) {
      case 1:
      case 2:
        delete PostNewData?.productId;
        break;

      case 3:
        delete PostNewData?.petId;
        break;

      default:
        delete PostNewData?.productId;
        delete PostNewData?.petId;
        break;
    }
    const UpdatedPostData = await replacePostById({
      PostId: postId,
      PostNewData,
    });

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
