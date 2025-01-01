import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { deleteComment } from "../../queries/comment";
import CustomError from "../../helpers/CustomError";

async function deleteCommentController(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const userId = req.userInfo!.id;
    const { commentId } = req.params;

    const deletedCommentData = await deleteComment(commentId, userId);

    if(!deletedCommentData) throw new CustomError(404, "This comment are not exists.");

    res.status(200).json({
      message: "The comment are deleted now",
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default deleteCommentController;
