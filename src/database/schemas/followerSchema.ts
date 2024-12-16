import mongoose, { Schema } from "mongoose";

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

// Create the Follower model
const Follower = mongoose.model("Follower", followerSchema);

export default Follower;
