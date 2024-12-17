import Comment from "../../database/schemas/commentSchema";
import { Types } from "mongoose";

// call old Comments service by Post ID
const callCommentsByPostId = async (
  postId: Types.ObjectId | string,
  index: string = "0",
  count: string = "5"
) => {
  const indexNum = Number(index) > 0 ? Number(index) : 0;
  const countNum = Number(count) > 0 ? Number(count) : 5;

  let comments = await Comment.find({ postId }, "-postId -updatedAt")
    .skip(indexNum * countNum)
    .limit(countNum)
    .populate("userId", "fullName email userImage -_id");

  return comments;
};

export default callCommentsByPostId;
