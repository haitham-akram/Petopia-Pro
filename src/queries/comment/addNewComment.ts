import Comment from "../../database/schemas/commentSchema";
import INewComment from "../../interfaces/NewCommentInterface";

// Add new Post service
const addNewComment = async (CommentData: INewComment) => {
  // Save the Comment to the database
  const newComment = new Comment(CommentData);
  return await newComment.save();
};

export default addNewComment;
