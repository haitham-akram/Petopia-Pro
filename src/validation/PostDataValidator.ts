import IPost from "../interfaces/PostDataInterface";
import * as Yup from "yup";
import { yupNumber, yupString } from "./YupBasics";

async function PostDataValidator(PostData: IPost) {
  const ImageSchema = Yup.object().shape({
    url: yupString,
  });

  const yupImagesArray = Yup.array().of(ImageSchema);

  const schema = Yup.object().shape({
    userId: yupString.required("You need to login first before posting."),
    petId: yupString,
    categoryId: yupNumber.default(0),
    postContent: yupString.required("You must enter Somthing before posting."),
    likesCount: yupNumber.default(0),
    commentsCount: yupNumber.default(0),
    images: yupImagesArray,
  });

  const result = await schema.validate(PostData, { abortEarly: false });

  return result;
}

export default PostDataValidator;
