import { Types } from "mongoose";
import Comment from "../../database/schemas/commentSchema";

// Add new Post service
const updateComment = async (
  commentId: Types.ObjectId | string,
  userId: Types.ObjectId | string,
  commentData: { commentText: string }
) => {
  // Save the Comment to the database
  const UpdatedComment = Comment.findByIdAndUpdate(
    { _id: commentId, userId },
    commentData,
    { new: true }
  );

  return await UpdatedComment;
};

export default updateComment;
