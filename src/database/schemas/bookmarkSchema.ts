import mongoose, { Schema } from "mongoose";
import { IBookmark } from "../../interfaces/IBookmark";

// Define the Bookmark schema
const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    marked_posts: [
      {
        postId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create a compound index to ensure unique bookmarks per user
bookmarkSchema.index({ userId: 1, "marked_posts.postId": 1 }, { unique: true });

// Create the Bookmark model from the schema
const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema);

export default Bookmark;
