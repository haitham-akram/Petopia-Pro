import Post from "../../database/schemas/postSchema";
import IPost from "../../interfaces/PostDataInterface";
import IQureyReturn from "../../interfaces/queryReturnInterface";

// call old Post by query
const callOnePostById = async ({ postId }: { postId: string }) => {
  // Save the Post to the database
  return (await Post.findById(postId)) as IPost;
};

export default callOnePostById;
