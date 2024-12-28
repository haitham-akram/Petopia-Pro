import { type Response, type NextFunction, type Request } from "express";
import { callCommentsByPostId } from "../../queries/comment";
// import { callOnePostById } from "../../queries/posts";
import CustomError from "../../helpers/CustomError";

async function callCommentsByPostIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const postId = req.params.postId;
    const { index, count } = req.query;

    const comments = (await callCommentsByPostId(
      postId,
      index as string,
      count as string
    )) as [];

    if (!comments.length) new CustomError(404, "There is no comments yet.");

    res.status(200).json({
      message: `This is the comments for this post.`,
      comments,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default callCommentsByPostIdController;
