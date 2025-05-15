import mongoose from "mongoose";
import Follower from "../../database/schemas/followerSchema";
import Post from "../../database/schemas/postSchema";

// call Posts query using UserId (or all posts without the userId)
const callFYPPostOnPagenation = async (
  index: string = "0",
  count: string = "5",
  userId: string,
  cate?: string,
) => {
  const indexNum = Number(index) > 0 ? Number(index) : 0;
  const countNum = Number(count) > 0 && Number(count) < 21 ? Number(count) : 5;

  let categoryFind: any = {}
  if (typeof cate == "string") {
    categoryFind = { categoryId: cate }
  }

  const followerId = new mongoose.Types.ObjectId(userId)

  const followings = await Follower.aggregate([
    {
      $match: { followerId, },
    },
    {
      $lookup: {
        from: 'users',
        localField: `followingId`,
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: "$user" },
    {
      $project: {
        user: { _id: 1, fullName: 1, email: 1, userImage: 1 },
        createdAt: 1,
        updatedAt: 1,
      }
    }
  ]);

  const followingUserIds = followings.map((follower) => new mongoose.Types.ObjectId(String(follower.user._id)));

  console.log("Hello from callFYPPostOnPagenation");

  const followingPosts = Post.find({ userId: { $in: followingUserIds }, ...categoryFind })
    .skip(indexNum * countNum)
    .limit(countNum)
    .populate("product", "-userId")
    .populate("pet", "-ownerId")
    .populate('category', "title -_id -categoryId")
    .populate("user", "id userName fullName userImage  isAdmin followers followings")
    .populate({
      path: 'likes',
      populate: {
        path: 'userId', model: 'User', select: '-_id -postId -password -verified -phone -status -profileImage -bio -address -email -followerCount -followingCount -createdAt -updatedAt '
      }
    });

  return followingPosts;
};

export default callFYPPostOnPagenation;
