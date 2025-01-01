import { type Response, type NextFunction, type Request } from "express";
import { callPostOnPagenation } from "../../queries/posts";

// All Done and tested ✅
async function callPostsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { index, count } = req.query;
    const { userId } = req.params;

    const allPosts = await callPostOnPagenation(
      index as string,
      count as string,
      userId as string
    );

    if (!allPosts.length) {
      res.status(404).json({
        message: "No posts found for this search",
      });
      return;
    }

    res.status(200).json({
      message: "This are the Posts you called",
      data: {
        count: allPosts.length,
        Posts: allPosts,
      },
    });
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default callPostsController;

/**
 * Tests
 *  test 1: using user Id Done ✅👌
 *  test 2: without user Id Done ✅👌
 *  test 3: pagination (with and without it) Done ✅👌
 *  
 */
