import Like from "../../database/schemas/likeSchema";
import { Types } from "mongoose";

interface ILikeId {
  relateId: Types.ObjectId | string;
  isComment?: boolean;
}

// call all Like for (comment or post) query
const callLike = async (
  LikeData: ILikeId,
  index: string | number = "0",
  limit: string | number = "6"
) => {
  index = Number(index) > 0 ? Number(index) : 0;
  limit = Number(limit) > 5 || Number(limit) < 21 ? Number(limit) : 5;

  return await Like.find(LikeData)
    .select("-isComment -relateId")
    .populate("user", "id userName fullName userImage  isAdmin followers followings")
    .skip(index * limit)
    .limit(limit)
};

export default callLike;
