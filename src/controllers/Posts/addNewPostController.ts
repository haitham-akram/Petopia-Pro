import { addNewPost } from "../../queries/Posts";
import { type Response, type NextFunction, type Request } from "express";
import PostDataValidator from "../../validation/PostDataValidator";
import IPost from "../../interfaces/PostDataInterface";
import { callOnePetById } from "../../queries/Pet";
import CustomError from "../../helpers/CustomError";

async function AddNewPostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { PostData }: { PostData: IPost } = req.body;

    const validatedPostData = await PostDataValidator(PostData);
    let NewPost;

    // console.log(validatedPostData)
    try {
      switch (validatedPostData.categoryId) {
        case 1:
        case 2:
          const addedPet = await callOnePetById(PostData.petId as string);
          // console.log(addedPet.ownerId.toString())
          if (
            !addedPet ||
            addedPet.ownerId.toString() !== validatedPostData.userId
          ) {
            throw new CustomError(
              401,
              "You don't have the cradentional to add this Pet ot It's not Exist"
            );
          }
          validatedPostData.petId = addedPet._id;
          // console.log(PostData);
          break;
        case 3:
          const addedProduct = await callOnePetById(PostData.petId as string);

          PostData.userId = validatedPostData.userId;
          if (addedProduct.userId !== validatedPostData.userId) {
            throw new CustomError(
              401,
              "You don't have the cradentional to add this Product"
            );
          }
          // console.log(PostData);
          break;
      }
    } catch (err) {
      next(err);
    }

    NewPost = await addNewPost(validatedPostData);
    console.log(validatedPostData);

    res.status(201).json({
      message: `Post created successfully with ID: ${NewPost._id}`,
      data: {
        post: PostData,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }

  next();
}

export default AddNewPostController;
