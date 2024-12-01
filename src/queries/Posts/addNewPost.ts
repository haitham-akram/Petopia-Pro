import Post from "../../database/schemas/postSchema";
import IPost from '../../interfaces/PostDataInterface'

// Add new Post service
const addNewPost = async ({ PostData }: { PostData: IPost }) => {
  // Save the Post to the database
  const newPost = new Post(PostData);
  return await newPost.save();

  // Save the post if the post have one to the database
  // console.log("Post saved:", newPost);
};

export default addNewPost;
