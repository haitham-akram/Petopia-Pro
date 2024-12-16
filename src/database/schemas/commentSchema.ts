import mongoose, { Schema } from "mongoose";
import Post from "./postSchema";
import CustomError from "../../helpers/CustomError";

// Define the Comment schema
const commentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      require: true,
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

commentSchema.pre("save", async function (next) {
  try {
    const post = await Post.findByIdAndUpdate(this.postId, {
      $inc: { commentsCount: 1 },
    });
    if (!post) {
      next(new CustomError(404, "No Post with this Id."));
    } else {
      next();
    }
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
