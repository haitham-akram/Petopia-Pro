import Post from "../../database/schemas/postSchema";
import IPost from "../../interfaces/PostDataInterface";

// call old Post by query
const callOnePostById = async ({ postId }: { postId: string }) => {
  // Save the Post to the database
  return (await Post.findById(postId)) as IPost;
};

export default callOnePostById;
