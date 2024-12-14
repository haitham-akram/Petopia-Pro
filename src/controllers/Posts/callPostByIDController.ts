import { type Response, type NextFunction } from "express";
import Post from "../../database/schemas/postSchema";
import { callOneProductById } from "../../queries/product";
import { getPetIdQuery } from "../../queries/pet";
import CustomError from "../../helpers/CustomError";
import { IPet } from "../../interfaces/iPet";
import { type CustomRequest } from "../../interfaces/iUser";

// All Done and tested ✅
async function callPostByIdController(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const postId = req.params.postId;

    const PostData = await Post.findById(postId);
    if (!PostData) {
      throw new CustomError(404, "There is no Post with this ID.");
    }

    let AttachedData = {
      PetData: {},
      ProductData: {},
    };

    let respone;

    switch (PostData?.categoryId) {
      case 1:
      case 2:
        if (PostData?.petId) {
          const PetData = (await getPetIdQuery(
            PostData?.petId.toString()
          )) as unknown as IPet;
          console.log(
            "PetData",
            PetData.ownerId.toString(),
            PostData.userId.toString()
          );
          if (
            PetData &&
            PetData.ownerId.toString() === PostData.userId.toString()
          ) {
            AttachedData.PetData = PetData;
          }
        }
        break;

      case 3:
        if (PostData?.productId) {
          const ProductData = await callOneProductById(PostData?.productId);
          console.log(PostData?.productId);
          if (
            ProductData &&
            ProductData.userId!.toString() === PostData.userId.toString()
          ) {
            AttachedData.ProductData = ProductData || {};
          }
        }
        break;
    }

    respone = {
      message: `Post founded with ID ${postId}`,
      data: {
        PostData,
        ...AttachedData,
      },
    };

    res.status(200).json(respone);
  } catch (err) {
    // Passing the error to the route just in case it happened
    next(err);
  }

  //   passing the final result to the route to share the respone if adding new document to the database
  next();
}

export default callPostByIdController;
