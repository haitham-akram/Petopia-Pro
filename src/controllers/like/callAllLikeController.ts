import { type Response, type NextFunction, type Request } from "express";
import callLike from "../../queries/likes/callLikes";

async function callAllLikeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const relateId = req.params.relateId as string;
    const { index, limit } = req.query;
    const isComment = Object.keys(req.query).includes("comment");

    const likes = await callLike({ relateId, isComment }, index as string, limit as string);

    res.status(200).json({
      message: "all likes are called",
      likes,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default callAllLikeController;
