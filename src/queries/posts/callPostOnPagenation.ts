import Post from "../../database/schemas/postSchema";

// All Done and tested ✅

// call Posts query using UserId (or all posts without the userId)
const callPostOnPagenation = async (
  index: string = "0",
  count: string = "5",
  userId?: string | undefined
) => {
  const indexNum = Number(index) > 0 ? Number(index) : 0;
  const countNum = Number(count) > 0 || Number(count) < 21 ? Number(count) : 5;

  let filterPosts = Post.find();

  if (userId) {
    filterPosts = Post.find({ userId }, "-userId");
  }

  const allPosts = await filterPosts
    .populate("productId")
    .populate("petId")
    .populate("userId", "fullName email userImage -_id")
    .skip(indexNum * countNum)
    .limit(countNum);

  return allPosts;
};

export default callPostOnPagenation;
