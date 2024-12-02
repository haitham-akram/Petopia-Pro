import IPost from "../interfaces/PostDataInterface";
import * as Yup from "yup";

async function PostDataValidator({ PostData }: { PostData: IPost }) {
  const yupNumber = Yup.number().required();
  const yupString = Yup.string().trim().required();

  const ImageSchema = Yup.object().shape({
    url: yupString,
  });

  const yupImagesArray = Yup.array().of(ImageSchema);

  const schema = Yup.object().shape({
    userId: yupString,
    categoryId: yupNumber,
    postContent: yupString,
    likesCount: yupNumber.default(0),
    commentsCount: yupNumber.default(0),
    images: yupImagesArray,
  });

  const result = await schema.validate(PostData, { abortEarly: false });

  return result;
}

export default PostDataValidator;
