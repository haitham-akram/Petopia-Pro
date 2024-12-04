import { type Response, type NextFunction } from "express";
import { CustomSearchPostRequest } from "../../interfaces/CustomRequestInterface/CallOldPostRequestInterface";
import SearchWordValidator from "../../validation/SearchPostValidator";
import SearchForPost from "../../queries/Posts/searchForPost";

async function searchPostController(
  req: CustomSearchPostRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // The Controller of calling new query after collect the data from the body and validate it using yup
    // This is just an Example of the controller

    const { SearchData } = req.headers;
    const validatedWordData = await SearchWordValidator(SearchData);
    const OldPost = await SearchForPost(validatedWordData);

    let messageRespone = {
      message: "No Post founded by this words",
      data: {},
    };

    if (OldPost) {
      messageRespone = {
        message: `Post founded successfully with ID: `,
        data: {
          post: OldPost,
        },
      };
    }

    res.status(201).json(messageRespone);
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default searchPostController;
