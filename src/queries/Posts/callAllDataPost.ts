import Post from "../../database/schemas/postSchema";
// import IPost from "../../interfaces/PostDataInterface";

// call old Post by query
const callAllDataPost = async (postId: string) => {
  // Save the Post to the database
  const post = await Post.findById(postId);

  return post;
};

export default callAllDataPost;
