import { callOnePetById } from "../queries/Pet";
import { callOneProductById } from "../queries/Product";
import CustomError from "./CustomError";

async function PostAttachedData(
  validatedPostData: any,
  PostData: any,
  AttachedData: any
) {
  switch (validatedPostData.categoryId) {
    // No dat should be attached
    default:
      delete validatedPostData.petId;
      delete validatedPostData.productId;
      break;

    // Pet data attached value
    case 1:
    case 2:
      if (!PostData.petId) {
        throw new CustomError(400, "No Pet added");
      }

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

    // Product data attached value
    case 3:
      if (!PostData.productId) {
        throw new CustomError(400, "No Product added");
      }

      const addedProduct = await callOneProductById(PostData.productId!);
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
