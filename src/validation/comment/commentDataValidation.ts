import * as Yup from "yup";
import { yupString } from "../YupBasics";
import INewComment from "../../interfaces/NewCommentInterface";

async function commentDataValidator(CommentData: INewComment) {
  const schema = Yup.object().shape({
    userId: yupString.required(),
    postId: yupString.required(),
    commentText: yupString
      .required("Comment text is required")
      .min(1, "Comment text must be at least 1 character")
      .max(500, "Comment text cannot exceed 500 characters"), // Set a reasonable max length
  });

  const result = await schema.validate(CommentData, { abortEarly: false });

  return result;
}

export default commentDataValidator;
