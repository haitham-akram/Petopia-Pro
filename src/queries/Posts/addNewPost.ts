import Post from "../../database/schemas/postSchema";
import INewPost from "../../interfaces/NewPostInterface";
// Add new Post query
const addNewPost = async (PostData: INewPost) => {
  // Save the Post to the database
  const newPost = new Post(PostData);
  return await newPost.save();
};

export default addNewPost;
