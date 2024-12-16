// import IPost from "../../interfaces/PostDataInterface";
import * as Yup from "yup";
import { yupNumber, yupString } from "../YupBasics";
import INewPost from "../../interfaces/NewPostInterface";

async function PostDataValidator(PostData: INewPost) {
  const ImageSchema = Yup.object().shape({
    url: yupString,
  });

  const yupImagesArray = Yup.array().of(ImageSchema);

  const schema = Yup.object().shape({
    userId: yupString.required("You need to login first before posting."),
    petId: yupString,
    productId: yupString,
    categoryId: yupNumber.transform((originalValue) => (0 > originalValue ||  originalValue > 3) ? 0:  originalValue),
    postContent: yupString.required("You must enter Somthing before posting."),
    likesCount: yupNumber.transform(() => 0),
    commentsCount: yupNumber.transform(() => 0),
    images: yupImagesArray,
  });

  const result = await schema.validate(PostData, { abortEarly: false });

  return result;
}

export default PostDataValidator;
