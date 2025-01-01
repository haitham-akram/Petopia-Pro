import { type Response, type NextFunction } from "express";
import {
  callAllDataPost,
  // callOnePostById,
  // updatePostById,
  replacePostById,
} from "../../queries/posts";
import IUpdatePost from "../../interfaces/PostUpdateDataInterface";
import UpdateAttachedData from "../../helpers/updatePostAttachedData";
import PostUpdateDataValidator from "../../validation/post/postUpdateDataValidator";
import { type CustomRequest } from "../../interfaces/iUser";
import IPost from "../../interfaces/PostDataInterface";

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
    const userId = req.userInfo?.id;

    // validate data
    const validatedUpdatedData = await PostUpdateDataValidator(NewPostData);

    if (!validatedUpdatedData) {
      res.status(204).json({
        message: "You didn't add new data, No post has been updated.",
      });
    }

    // call old post
    const PostData = (await callAllDataPost(postId)) as unknown as IPost;

    if (!PostData) {
      res.status(404).json({
        message: "No post to updated.",
      });
      return;
    }

    if (PostData.userId.toString() !== userId) {
      res.status(401).json({
        message: "Not authorized operation.",
      });
      return;
    }

    // update attached data and thier IDes (if it's exist)
    const { status, message, AttachedData, postDataEdited } =
      await UpdateAttachedData({
        NewPostData,
        PostData,
      });

    if (status) {
      res.status(status).json(message);
      return;
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
      return;
    }

    res.status(202).json({
      message: "The post has been updated.",
      UpdatedPostData,
      ...AttachedData,
    });
    return;
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }
  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default updatePostController;

/**
 *
 * Tests
 *    test 1:Update from category 0 to 1 or 2 and add pet Done 👌✅
 *    test 2:Update from category 1 or 2 to 0 and remove the pet Done 👌✅
 *    test 3:Update from category 1 or 2 to 0 and remove the pet Done 👌✅
 *    test 4:Update from category 3 to 1 or 2 and replace the pet with product Done 👌✅
 *    test 5:Update from category 3 to 0 and remove the product Done 👌✅
 */
