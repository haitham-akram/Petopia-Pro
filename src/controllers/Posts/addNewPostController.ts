import { addNewPost, addNewPostImage } from "../../queries/Posts";
import IPost from "../../interfaces/PostDataInterface";
import IPostImage from "../../interfaces/PostImageInterface";

async function AddNewPostController({
  PostData,
  PostImageData,
}: {
  PostData: IPost;
  PostImageData: IPostImage;
}) {
  console.log(PostData);

  let newPostImage;
  let newPost;

  try {
    if (PostData.isHaveImg) {
      newPost = await addNewPost({ PostData });
      PostImageData.postId = newPost.id;
      newPostImage = await addNewPostImage({ PostImageData });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.log("All functions attempted.");
  }

  return { newPostImage, newPost };
}

export default AddNewPostController;
