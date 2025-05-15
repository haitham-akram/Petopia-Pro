import Post from "../../database/schemas/postSchema";
// import IPost from "../../interfaces/PostDataInterface";

// call old Post by query
const callOnePostById = async (postId: string) => {
  if (!postId) {
    return await Post.find()
      .populate("userId", "fullName email userImage -_id")
      .populate("productId")
      .populate("petId");
  }

  // Save the Post to the database
  return await Post.findById(postId)
    .populate("userId", "fullName email userImage -_id")
    .populate("productId")
    .populate("petId");
};

export default callOnePostById;
