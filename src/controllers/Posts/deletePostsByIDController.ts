import { type Response, type NextFunction } from "express";
import { callPostExistence, deletePostById } from "../../queries/posts";
import { type CustomRequest } from "../../interfaces/iUser";
import CustomError from "../../helpers/CustomError";

// Delete posts controller By Id under work and test 🏃
async function deletePostsByIDController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req?.user?.id as string;
    const userEmail = req?.user?.email;
    const postId = req.params.postId as string;

    if (!userId || !postId) {
      new CustomError(404, "somthing wrong try again later");
    }

    const deletedPost = await deletePostById(postId, userId);

    if (!deletedPost) throw new CustomError(404, "Post was not found.");

    res.status(200).json({
      message: `This post have been deleted by user ${userEmail}, and will be unable to recall it again.`,
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default deletePostsByIDController;

/**
 * Tests
 *    test 1: Deleteing by Id work and check the user auth pretty good;
 *
 */
