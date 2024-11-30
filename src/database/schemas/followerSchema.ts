import mongoose, { Schema } from "mongoose";

// Define the Follower schema
const followerSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    follows: [
      {
        userId: {
          type: Number, // The user ID
          required: true,
          unique: true, // Ensures no duplicate followId
        },
        follow: {
          type: Number, // 0 (not following) or 1 (following) or 2 (mutual)
          required: true,
        },
      },
    ],
    number_of_followes:{
      0:{
        type: Number, // the count of each state to use as an index for pagination
        required: true,
      },
      1:{
        type: Number, // the count of each state to use as an index for pagination
        required: true,
      },
      2:{
        type: Number, // the count of each state to use as an index for pagination
        required: true,
      },
    }
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Follower model from the schema
const Follower = mongoose.model("Follower", followerSchema);

export default Follower;
