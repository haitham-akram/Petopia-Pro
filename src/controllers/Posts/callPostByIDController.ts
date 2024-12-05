import { type Response, type NextFunction, type Request } from "express";
import Post from "../../database/schemas/postSchema";
import Pet from "../../database/schemas/petSchema";
import Product from "../../database/schemas/productSchema";

async function callPostByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const postId = req.params.postId;

    const PostData = await Post.findById(postId);
    let AttachedData = {
      PetData: {},
      ProductData: {},
    };

    let respone;

    if (!PostData) {
      respone = {
        message: `No Post founded with ID ${postId}`,
        data: {},
      };
    }
    // console.log(PostData);

    if (PostData?.petId) {
      // console.log("i have a pet")
      const PetData = await Pet.findById(PostData?.petId);
      if (
        PetData &&
        PetData.ownerId.toString() === PostData.userId.toString()
      ) {
        AttachedData.PetData = PetData;
      }
    }

    if (PostData?.productId) {
      const ProductData = await Product.findById(PostData?.productId);
      if (
        ProductData &&
        ProductData.userId!.toString() === PostData.userId.toString()
      ) {
        AttachedData.ProductData = ProductData || {};
      }
    }

    respone = {
      message: `Post founded with ID ${postId}`,
      data: {
        PostData,
        AttachedData,
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
