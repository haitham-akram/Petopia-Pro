import { ObjectId } from "mongoose";
import Post from "../../database/schemas/postSchema";

// Delete old Post query
const deletePostById = async (
  PostId: ObjectId | string,
  UserId: ObjectId | string
) => {
  // Delete old Post to the database (Hard delete)
  const deletedPost = Post.findOneAndDelete(
    { _id: PostId, userId: UserId },
    { new: true }
  );
  return await deletedPost;
};

export default deletePostById;
