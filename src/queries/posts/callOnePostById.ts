import Post from "../../database/schemas/postSchema";
// import IPost from "../../interfaces/PostDataInterface";

// call old Post by query
const callOnePostById = async (postId: string) => {
  // Save the Post to the database
  const post = await Post.findById(postId)
    .populate("userId", "fullName email userImage -_id")
    .populate("productId")
    .populate("petId");

  return post;
};

export default callOnePostById;
