import mongoose, { Schema } from "mongoose";

// Define the Bookmark schema
const bookmarkSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    marked_posts: [
      {
        postId: {
          type: Number, // The user ID
          required: true,
          unique: true, // Ensures no duplicate followId
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Bookmark model from the schema
const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
