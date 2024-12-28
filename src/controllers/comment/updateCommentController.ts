import { type Response, type NextFunction } from "express";
import { CustomRequest } from "../../interfaces/iUser";
import { updateComment } from "../../queries/comment";
import CustomError from "../../helpers/CustomError";

async function updateCommentController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userInfo!.id;
    const { commentId } = req.params;
    const { newCommentData } = req.body;

    const updatedComment = await updateComment(
      commentId,
      userId,
      newCommentData
    );

    if (!updateComment)
      throw new CustomError(404, "This comment are not exist.");

    res.status(200).json({
      message: "The comment are updated.",
      newCommentData: updatedComment,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default updateCommentController;
