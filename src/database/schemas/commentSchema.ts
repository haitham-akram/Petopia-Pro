import mongoose, { Schema } from "mongoose";
import Post from "./postSchema";

// Define the Comment schema
const commentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    commentText: {
      type: String, // Store commentText as a string
      required: true, // Make commentText required
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

commentSchema.post("save", async function (doc, next) {
  try {
    await Post.findByIdAndUpdate(doc.postId, { $inc: { commentsCount: 1 } });
    next();
  } catch (err) {
    next();
  }
});

commentSchema.post("deleteOne", async function (doc, next) {
  try {
    await Post.findByIdAndUpdate(doc.postId, { $inc: { commentsCount: -1 } });
    next();
  } catch (err) {
    next();
  }
});

// Create the Comment model from the schema
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
