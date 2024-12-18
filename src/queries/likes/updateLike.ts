import Like from "../../database/schemas/likeSchema";
import { Types } from "mongoose";

interface INewLike {
  userId: Types.ObjectId | string;
  relateId: Types.ObjectId | string;
  isComment?: boolean;
}

// Add new Like query
// This query work as toogle are add on one call and remove on the scond call
const addNewLike = async (LikeData: INewLike) => {
  // Save the Like to the database
  const newLike = new Like(LikeData);
  return await newLike.save();
};

export default addNewLike;
