import Comment from "../../database/schemas/commentSchema";
import { Types } from "mongoose";

// call old Comments service by Post ID
const callCommentsByPostId = async (
  postId: Types.ObjectId | string,
  index: string = "0",
  count: string = "5"
) => {
  let result;
  try {
    const indexNum = Number(index) > 0 ? Number(index) : 0;
    const countNum = Number(count) > 0 ? Number(count) : 5;

    console.log(indexNum, countNum);
    result = await Comment.find({ postId }, "-postId -updatedAt")
      .skip(indexNum * countNum)
      .limit(countNum)
      .populate("userId", "fullName email userImage -_id");
  } catch (error) {
    result = error;
  }
  return result;
};

export default callCommentsByPostId;
