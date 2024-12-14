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
    const userId = req.params.userId as string;

    const allPosts = await callPostOnPagenation(
      index as string,
      count as string,
      userId
    );

    if (!allPosts.length) {
      res.status(404).json({
        message: "No posts found for this search",
      });
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
