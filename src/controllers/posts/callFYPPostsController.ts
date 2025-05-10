import { type Response, type NextFunction, type Request } from "express";
import callFYPPostOnPagenation from "../../queries/posts/callPostsFYP";

// All Done and tested ✅
async function callFYPPostsController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { index, count } = req.query;
        const { userid } = req.headers;

        const allPosts = await callFYPPostOnPagenation(
            index as string,
            count as string,
            userid as string
        );

        // if (!allPosts.length) {
        //     res.status(404).json({
        //         message: "No posts found for this search",
        //     });
        //     return;
        // }

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

export default callFYPPostsController;

/**
 * Tests
 *  test 1: using user Id Done ✅👌
 *  test 2: without user Id Done ✅👌
 *  test 3: pagination (with and without it) Done ✅👌
 */
