import Comment from "../../database/schemas/commentSchema";


// call old Comments service by User ID
const callAllPostsCommentsByUserId = async ({ Userid }: { Userid: string }) => {
  let result;
  try {
    result = await Comment.find({ userId: Userid });
  } catch (error) {
    result = error;
  }

  console.log("Comment called:", result);
  return result;
};

export default callAllPostsCommentsByUserId