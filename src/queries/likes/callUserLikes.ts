import Like from "../../database/schemas/likeSchema";
import { Types } from "mongoose";

// call all Like for (comment or post) query
const callLike = async (
  userId: Types.ObjectId | string,
  index: string | number = 0,
  limit: string | number = 5
) => {
  index = Number(index) > 0 ? Number(index) : 0;
  limit = Number(limit) > 5 || Number(limit) < 21 ? Number(limit) : 5;

  return await Like.find({ userId })
    .skip(index * limit)
    .limit(limit);
};

export default callLike;
