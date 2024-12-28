import User from "../../database/schemas/userSchema";

// call old User account service by ID
const callPostCommentsByPostId = async ({ UserId }: { UserId: string }) => {
  let result;
  try {
    result = await User.findById(UserId);
  } catch (error) {
    result = error;
  }
  return result;
};

export default callPostCommentsByPostId;
