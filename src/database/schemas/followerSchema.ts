import mongoose, { Schema } from "mongoose";

// Define the Follower schema
const followerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    follows: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        followState: {
          type: Number, // 0 = not following, 1 = following, 2 = mutual
          enum: [0, 1, 2],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);



// Create the Follower model from the schema
const Follower = mongoose.model("Follower", followerSchema);

export default Follower;
