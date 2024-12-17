import Like from "../../database/schemas/likeSchema";
import { Types } from "mongoose";

interface INewLike {
  userId: Types.ObjectId | string;
  relateId: Types.ObjectId | string;
  isComment?: boolean;
}

// Add new Like query
const addNewLike = async (LikeData: INewLike) => {
  // Save the Like to the database
  const newLike = new Like({
    ...LikeData,
    isComment: LikeData.isComment,
  });
  return await newLike.save();
};

export default addNewLike;
