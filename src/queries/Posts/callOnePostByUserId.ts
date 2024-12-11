import Post from "../../database/schemas/postSchema";

// call old Post by query using userId
const callOnePostByUserId = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  // Save the Post to the database
  let result = {
    data: {},
    error: {},
  };

  try {
    const userPost = () => Post.findOne({ _id: postId, userId });
    result.data = await userPost;
  } catch (error) {
    result.error = "error in the query";
    return;
  }

  return result;
};

export default callOnePostByUserId;
