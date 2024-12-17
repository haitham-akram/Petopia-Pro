import { Types } from "mongoose";
import Comment from "../../database/schemas/commentSchema";

// Add new Post service
const deleteComment = async (
  CommentId: Types.ObjectId | string,
  userId: Types.ObjectId | string
) => {
  // Save the Comment to the database
  return await Comment.findOneAndDelete({ _id: CommentId, userId });
};

export default deleteComment;
