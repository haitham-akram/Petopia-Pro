import PostImage from "../../database/schemas/postImageSchema";
import Post from "../../database/schemas/postSchema";
import { PostDataType, PostImageDataType } from "../../interfaces/PostDataType";


// Add new Post service
const addNewPost = async ({
  PostData,
  PostImageData,
}: {
  PostData: PostDataType;
  PostImageData?: PostImageDataType;
}) => {
  // Save the Post to the database
  const newPost = new Post(PostData);
  await newPost.save();

  const newImage = new PostImage(PostImageData);

  // Save the image of the post if the post have one to the database
  await newImage.save();
  console.log("Post saved:", newPost);
};

export default addNewPost;
