import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import INewComment from "../../interfaces/NewCommentInterface";
import CustomError from "../../helpers/CustomError";
import commentDataValidator from "../../validation/comment/commentDataValidation";
import { addNewComment } from "../../queries/comment";

async function addNewCommentController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const postId = req.params.postId;
    const userId = req?.user?.id!;
    const commentData = req.body.commentData;

    if (!userId) new CustomError(404, "You don't have an account.");

    if (!postId) new CustomError(404, "This post does not exits.");

    const validatedCommentData = await commentDataValidator({
      ...commentData,
      postId,
      userId,
    } as INewComment);

    console.log(validatedCommentData);

    const addedComment = await addNewComment(
      validatedCommentData as unknown as INewComment
    );

    if (!addedComment) new CustomError(400, "Somthing went wrong.");

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
