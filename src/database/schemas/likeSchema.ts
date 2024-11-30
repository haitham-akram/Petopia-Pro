import mongoose, { Schema } from "mongoose";

// Define the Like schema
const likeSchema = new Schema(
  {
    likeId: {
      type: Number, // Store likeId as a number
      required: true,
      unique: true, // Ensures no duplicate likeId
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Number, // The ID of the post that was liked
      required: true,
    }
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Like model from the schema
const Like = mongoose.model('Like', likeSchema);

export default Like;
