import { type Response, type NextFunction } from "express";
import CustomError from "../../helpers/CustomError";
import { type CustomRequest } from "../../interfaces/iUser";
import { callPostOnPagenation } from "../../queries/posts";

// All Done and tested ✅
async function callPostByIdController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const postId = req.params.postId;

    const PostData = await callPostOnPagenation(postId);
    if (!PostData) throw new CustomError(404, "There is no Post with this ID.");

    res.status(200).json({
      message: `Post founded with ID ${postId}`,
      data: {
        PostData,
      },
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default callPostByIdController;

/**
 * Tests
 *    test 1: call post with category 0 (NO attached data)
 *    test 2: call post with category 1 or 2 (Pet data attached)
 *    test 3: call post with category 3 (Product data attached)
 *
 */