import Post from "../../database/schemas/postSchema";


// call old Post service by ID
const callPostById = async ({ PostId }: { PostId: string }) => {
  let result;

  try {
    result = await Post.findById(PostId);
  } catch (error) {
    result = error;
  }

  console.log("Post called:", result);
  return result;
};

export default callPostById;
