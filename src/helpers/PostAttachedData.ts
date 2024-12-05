import { callOnePetById } from "../queries/Pet";
import { callOneProductById } from "../queries/Product";
import CustomError from "./CustomError";

async function PostAttachedData(
  validatedPostData: any,
  PostData: any,
  AttachedData: any
) {
  switch (validatedPostData.categoryId) {
    case 1:
    case 2:
      const addedPet = await callOnePetById(PostData.petId!);
      if (
        !addedPet ||
        addedPet.ownerId.toString() !== validatedPostData.userId
      ) {
        throw new CustomError(
          401,
          "You don't have the cradentional to add this Pet ot It's not Exist"
        );
      } else {
        validatedPostData.petId = addedPet._id.toString();
        AttachedData.PetData = addedPet;
      }
      break;
    case 3:
      const addedProduct = await callOneProductById(PostData.productId!);
      console.log("addedProduct:", addedProduct);
      if (
        !addedProduct ||
        addedProduct.userId!.toString() !== validatedPostData.userId
      ) {
        throw new CustomError(
          401,
          "You don't have the cradentional to add this Product"
        );
      } else {
        validatedPostData.productId = addedProduct._id.toString();
        AttachedData.ProductData = addedProduct;
      }
      break;
  }

  return { ReadyPostData: validatedPostData, ReadyAttachedData: AttachedData };
}

export default PostAttachedData;
