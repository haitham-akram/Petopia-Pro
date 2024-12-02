import Post from "../../database/schemas/postSchema";
import IQureyReturn from "../../interfaces/queryReturnInterface";

// call old Post by query
const callOnePostById = async ({
  postId,
}: {
  postId: string;
}): Promise<IQureyReturn> => {
  // Save the Post to the database
  let result = {
    data: {},
    error: {},
  };

  try {
    const calledPost = () => Post.findById(postId);
    result.data = await calledPost;
  } catch (error) {
    result.error = {
      msg: "error in the post query",
      err: error,
    };
  }

  return result;
};

export default callOnePostById;
