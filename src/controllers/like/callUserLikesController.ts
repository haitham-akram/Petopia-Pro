import { type Response, type NextFunction } from "express";
import { type CustomRequest } from "../../interfaces/iUser";
import { callUserLikes } from "../../queries/likes";

async function callUserLikesController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userInfo?.id as string;
    const { index, limit } = req.query;

    const likes = await callUserLikes(userId, index as string, limit as string);

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

export default callUserLikesController;
