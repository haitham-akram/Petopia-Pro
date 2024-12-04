import { addNewPost } from "../../queries/Posts";
import { type Response, type NextFunction, type Request } from "express";
import PostDataValidator from "../../validation/PostDataValidator";
import IPost from "../../interfaces/PostDataInterface";
import { callOnePetById } from "../../queries/Pet";

async function AddNewPostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      PostData,
      PetData,
      ProductData,
    }: { PostData: IPost; PetData: any; ProductData: any } = req.body;

    const validatedPostData = await PostDataValidator(PostData);
    let NewPost;

    switch (validatedPostData.categoryId) {
      case 1:
      case 2:
        const addedPet = await callOnePetById(PetData.id);
        validatedPostData.petId = addedPet._id;
        console.log(PetData);
        break;
      case 3:
        ProductData.userId = validatedPostData.userId;
        console.log(ProductData);
        break;
      default:
        break;
    }

    NewPost = await addNewPost(validatedPostData);

    res.status(201).json({
      message: `Post created successfully with ID: ${NewPost._id}`,
      data: {
        post: PostData,
      },
    });
  } catch (err) {
    next(err);
  }

  next();
}

export default AddNewPostController;
