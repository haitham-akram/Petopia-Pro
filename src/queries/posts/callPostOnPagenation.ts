import Post from "../../database/schemas/postSchema";

// All Done and tested ✅

// call Posts query using UserId (or all posts without the userId)
const callPostOnPagenation = async (
  index: string = "1",
  count: string = "1",
  userId?: string | undefined
) => {
  const indexNum = Number(index) > 0 ? Number(index) : 1;
  const countNum = Number(count) > 0 || Number(count) < 21 ? Number(count) : 1;

  let filterPosts = Post.find();

  if (userId) {
    filterPosts = Post.find({ userId }, "-userId");
  }

  const allPosts = filterPosts
    .populate("product")
    .populate("pet", "-ownerId")
    .populate('category', "title -_id -categoryId")
    .populate("user", "id userName fullName userImage  isAdmin followers followings")
    .populate({
      path: 'comments',
      populate: {

        path: 'userId', model: 'User', select: '-_id -postId -password -verified -phone -status -profileImage -bio -address -email -followerCount -followingCount -createdAt -updatedAt '
        ,
        populate: [
          {
            path: 'followers',
            populate: [
              { path: 'followerUser', }
            ]
          },
          {
            path: 'followings', populate: [
              { path: 'followingUser', }
            ]
          }]
      }
    })
    .populate({
      path: 'likes',
      populate: {
        path: 'userId', model: 'User', select: '-_id -postId -password -verified -phone -status -profileImage -bio -address -email -followerCount -followingCount -createdAt -updatedAt '
      },
      match: { isComment: false },
    })
    .skip(indexNum * countNum)
    .limit(countNum);

  return allPosts;
};

export default callPostOnPagenation;
