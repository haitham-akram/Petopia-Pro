import Post from "../../database/schemas/postSchema";
import IUpdatePost from "../../interfaces/PostUpdateDataInterface";

// update old Post by query using ID
const UpdatePostById = async ({
  PostId,
  PostNewData,
}: {
  PostId: string;
  PostNewData: IUpdatePost;
}) => {
  const UpdatedPost = await Post.findOneAndUpdate(
    { _id: PostId },
    { $set: PostNewData },
    { new: true }
  );

  return UpdatedPost;
};

export default UpdatePostById;
