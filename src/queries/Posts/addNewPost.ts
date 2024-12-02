import Post from "../../database/schemas/postSchema";
import IPost from "../../interfaces/PostDataInterface";

// Add new Post query
const addNewPost = async ({ PostData }: { PostData: IPost }) => {
  // Save the Post to the database
  const newPost = new Post(PostData);
  return await newPost.save();
};

export default addNewPost;
