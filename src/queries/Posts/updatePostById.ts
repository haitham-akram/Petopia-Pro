import Post from "../../database/schemas/postSchema";
import IUpdatePost from "../../interfaces/PostUpdateDataInterface";

// update old Post by query using ID
const updatePostById = async ({
  PostId,
  PostNewData,
}: {
  PostId: string;
  PostNewData: IUpdatePost;
}) => {
  const updatedPost = await Post.findOneAndUpdate(
    { _id: PostId },
    { $set: PostNewData },
    { new: true }
  );

  return updatedPost;
};

export default updatePostById;
