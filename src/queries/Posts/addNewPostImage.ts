import PostImage from "../../database/schemas/postImageSchema";
import IPostImage from "../../interfaces/PostImageInterface";
import IQureyReturn from "../../interfaces/queryReturnInterface";

// Add new Post Image Query
const addNewImagePost = async ({
  PostImageData,
}: {
  PostImageData?: IPostImage;
}): Promise<IQureyReturn> => {
  // Save the image of the post to the database
  let result = {
    data: {},
    error: {},
  };

  try {
    const newImage = new PostImage(PostImageData);
    result.data = await newImage.save();
  } catch (error) {
    result.error = {
      msg: "error in the post query",
      err: error,
    };
  }

  return result;
};

export default addNewImagePost;
