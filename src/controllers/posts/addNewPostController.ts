import { addNewPost } from "../../queries/posts";
import { type Response, type NextFunction } from "express";
import PostDataValidator from "../../validation/post/postDataValidator";
import PostAttachedData from "../../helpers/postAttachedData";
import { type CustomRequest } from "../../interfaces/iUser";
import INewPost from "../../interfaces/NewPostInterface";
import { sendNotificationToUserChannel } from "../../socket/events";

// All Done and Tested ✅
async function AddNewPostController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user!.id;
    const actorName = req.user!.fullName;

    const PostData = { ...req.body.PostData, userId } as INewPost;

    const validatedPostData = await PostDataValidator(PostData);
    let NewPost;
    let AttachedData = {
      PetData: {},
      ProductData: {},
    };

    const { ReadyPostData, ReadyAttachedData } = await PostAttachedData(
      validatedPostData,
      PostData,
      AttachedData
    );

    NewPost = await addNewPost(ReadyPostData);

    console.log(actorName);

    sendNotificationToUserChannel({
      actorName,
      roomId: userId,
    });

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

/**
 * Tests:
 *    test 1: add new post without pet or post (category: 0) Done and Work ✅👌
 *    test 2: add new post with pet (category: 1 or 2) Done and Work ✅👌
 *          test the owned pet and the other pets
 *
 *    test 3: add new post with product (category 3) Done and Work ✅👌
 *          test the owned product and the other products
 *
 */
