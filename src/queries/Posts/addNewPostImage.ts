import PostImage from "../../database/schemas/postImageSchema";
import IPostImage from "../../interfaces/PostImageInterface";

// Add new Post service
const addNewImagePost = async ({
  PostImageData,
}: {
  PostImageData?: IPostImage;
}) => {
  try {
    // Save the image of the post if the post have one to the database
    const newImage = new PostImage(PostImageData);
    return await newImage.save();
  } catch (error) {
    return error;
  }
};

export default addNewImagePost;
