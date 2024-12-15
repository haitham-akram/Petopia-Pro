import { type Response, type NextFunction } from "express";

async function template(req: Request, res: Response, next: NextFunction) {
  try {

    // The Login of calling new query after collect the data from the body and validate it using yup

    // This is just an Example of the controller
    // const { PostData } = req.body;
    // const validatedPostData = await PostDataValidator(PostData);
    // const NewPost = await addNewPost(validatedPostData);
    // res.status(201).json({
    //   message: `Post created successfully with ID: ${NewPost._id}`,
    //   data: {
    //     post: PostData,
    //   },
    // });

  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

//   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default template;
