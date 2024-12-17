import Post from "../../database/schemas/postSchema";
// import IPost from "../../interfaces/PostDataInterface";

// call old Post by query
const callPostExistence = async (postId: string) => {
  // Save the Post to the database
  const post = await Post.findById(postId, "_id userId");

  return post;
};

export default callPostExistence;
