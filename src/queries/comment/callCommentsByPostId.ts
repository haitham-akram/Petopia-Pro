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

  let comments = await Comment.find({ postId }, "-postId -__v")
    .populate("userId", "fullName email userImage -_id")
    .populate({
      path: 'likes',
      select: "-isComment",
      populate: {
        path: 'userId', model: 'User', select: '-_id -postId -password -verified -phone -status -profileImage -bio -address -email -followerCount -followingCount -createdAt -updatedAt'
      },
      match: { isComment: true },
    })
    .skip(indexNum * countNum)
    .limit(countNum);

  return comments;
};

export default callCommentsByPostId;
