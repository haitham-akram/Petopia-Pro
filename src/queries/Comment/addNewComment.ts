import Comment from "../../database/schemas/commentSchema";
import { CommentDataType } from "../../interfaces/CommentDataType";


// Add new Post service
const addNewComment = async ({
  CommentData,
}: {
  CommentData: CommentDataType;
}) => {
  // Save the Comment to the database
  const newComment = new Comment(CommentData);
  await newComment.save();
  console.log("Comment saved:", newComment);
};

export default addNewComment
