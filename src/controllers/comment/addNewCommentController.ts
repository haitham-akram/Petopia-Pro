import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import INewComment from "../../interfaces/NewCommentInterface";
import CustomError from "../../helpers/CustomError";
import commentDataValidator from "../../validation/comment/commentDataValidation";
import { addNewComment } from "../../queries/comment";
import { sendNewCommentNotif } from "../../socket/notificationSends";

async function addNewCommentController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const postId = req.params.postId;
    const userId = req?.userInfo?.id!;
    const actorName = req?.userInfo?.fullName!;
    const commentData = req.body.commentData;

    if (!userId) throw new CustomError(404, "You don't have an account.");

    if (!postId) throw new CustomError(404, "This post does not exits.");

    const validatedCommentData = await commentDataValidator({
      ...commentData,
      postId,
      userId,
    } as INewComment);

    const addedComment = await addNewComment(
      validatedCommentData as unknown as INewComment
    ).then(async data => {
      if (!data) new CustomError(400, "Somthing went wrong.");

      await sendNewCommentNotif(actorName, userId, data.commentText)
      return data
    });


    res.status(201).json({
      message: "Comment added successfully",
      comment: addedComment,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default addNewCommentController;
