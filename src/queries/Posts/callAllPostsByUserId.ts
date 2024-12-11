import Post from "../../database/schemas/postSchema";
import IQureyReturn from "../../interfaces/queryReturnInterface";

// call old Post by query using userId
const callOnePostByUserId = async ({
  userId,
}: {
  userId: string;
}): Promise<IQureyReturn> => {
  // Save the Post to the database
  let result = {
    data: {},
    error: {},
  };

  try {
    const userPost = () => Post.find({ userId });
    result.data = await userPost;
  } catch (error) {
    result.error = {
      msg: "error in the post query",
      err: error,
    };
  }

  return result;
};

export default callOnePostByUserId;
