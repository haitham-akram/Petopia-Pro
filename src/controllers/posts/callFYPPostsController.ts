import { type Response, type NextFunction } from "express";
import callFYPPostOnPagenation from "../../queries/posts/callPostsFYP";
import { CustomRequest } from "../../interfaces/iUser";

// All Done and tested ✅
async function callFYPPostsController(
    req: CustomRequest,
    res: Response,
    next: NextFunction
) {
    try {
        const { index, count, cate } = req.query;
        const userInfo = req.userInfo as { id: string, email: string, fullName: string, isAdmin: boolean };

        console.log("Hello from callFYPPostsController");
        console.log("userInfo", userInfo);

        const allPosts = await callFYPPostOnPagenation(
            index as string,
            count as string,
            userInfo.id,
            cate as string
        );

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
