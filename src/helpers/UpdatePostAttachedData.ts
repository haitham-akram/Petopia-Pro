import IPost from "../interfaces/PostDataInterface";
import IUpdatePost from "../interfaces/PostUpdateDataInterface";
import { callOnePetById } from "../queries/Pet";
import { callOneProductById } from "../queries/Product";

async function UpdateAttachedData({
  NewPostData,
  PostData,
}: {
  NewPostData: IUpdatePost;
  PostData: IPost;
}) {
  const AttachedData = {
    PetData: {},
    ProductData: {},
  };

  switch (NewPostData.categoryId) {
    default:
      //   delete NewPostData pet Id;
      //   delete NewPostData product Id;

      break;
    case 1:
    case 2:
      // Switch the type of the post and need to add Pet
      // NewPostData.productId === undefined;
      // delete NewPostData.productId;

      console.log("31", !NewPostData.petId);
      if (!NewPostData.petId) {
        return {
          status: 200,
          message: "The pet data are missing.",
        };
      }

      const newPet = await callOnePetById(NewPostData.petId!);

      if (!newPet) {
        return {
          status: 200,
          message: "The new pet are not exist.",
        };
      }
      console.log("Pet", newPet);
      if (newPet!.ownerId!.toString() !== PostData.userId?.toString()) {
        return {
          status: 203,
          message: "You dont own this pet.",
        };
      }
      AttachedData.PetData = newPet;

      break;

    case 3:
      // Switch the type of the post and need to add (Product)
      // NewPostData?.petId! === null;
      // delete NewPostData?.petId;
      if (!NewPostData.productId) {
        return {
          status: 200,
          message: "The product data are missing.",
        };
      }

      const newProduct = await callOneProductById(NewPostData.productId!);

      if (!newProduct) {
        return {
          status: 200,
          message: "The new product are not exist.",
        };
      }

      if (newProduct!.userId?.toString() !== PostData.userId.toString()) {
        return {
          status: 203,
          message: "You dont own this product.",
        };
      }

      AttachedData.ProductData = newProduct || {};

      break;
  }

  return {
    status: 0,
    message: "",
    AttachedData,
    postDataEdited: NewPostData,
  };
}

export default UpdateAttachedData;
