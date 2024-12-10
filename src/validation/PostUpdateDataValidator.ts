import * as Yup from "yup";
import { yupNumber, yupString } from "./YupBasics";
import IUpdatePost from "../interfaces/PostUpdateDataInterface";

async function PostUpdateDataValidator(PostData: IUpdatePost) {
  
  const ImageSchema = Yup.object().shape({
    url: yupString,
  });

  const yupImagesArray = Yup.array().of(ImageSchema);

  const schema = Yup.object().shape({
    petId: yupString,
    productId: yupString,
    categoryId: yupNumber,
    postContent: yupString,
    images: yupImagesArray,
  });

  const result = await schema.validate(PostData, { abortEarly: false });

  return result;
}

export default PostUpdateDataValidator;
