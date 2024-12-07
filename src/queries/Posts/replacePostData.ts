import Post from "../../database/schemas/postSchema";
import IPost from "../../interfaces/PostDataInterface";

// update old Post by query using ID
const ReplacePostById = async ({
  PostId,
  PostNewData,
}: {
  PostId: string;
  PostNewData: IPost;
}) => {
  const ReplacedPost = await Post.findOneAndReplace(
    { _id: PostId },
    PostNewData,
    { new: true }
  );

  return ReplacedPost;
};

export default ReplacePostById;
