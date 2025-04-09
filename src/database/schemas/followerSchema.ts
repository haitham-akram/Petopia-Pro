import mongoose, { Schema } from "mongoose";
import { addNewConnection, getPublicConnection } from "../../queries/connections";
import CustomError from "../../helpers/CustomError";

// Define the Follower schema
const followerSchema = new Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

followerSchema.virtual("followerUser", {
  ref: 'User',
  localField: 'followerId',
  foreignField: '_id',
  justOne: true,
})

followerSchema.virtual("followingUser", {
  ref: 'User',
  localField: 'followingId',
  foreignField: '_id',
  justOne: true,
})

followerSchema.post("save", async ({ followerId, followingId }, next) => {
  try {
    await getPublicConnection(followingId)
      .then(async newRoom => await addNewConnection(followerId, newRoom));
  } catch (error) {
    throw new CustomError(400, "Somthing went wrong")
  }
  next()
})

// Create the Follower model
const Follower = mongoose.model("Follower", followerSchema);

export default Follower;
