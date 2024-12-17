import mongoose, { Schema } from "mongoose";
import Post from "./postSchema";
import Comment from "./commentSchema";
import CustomError from "../../helpers/CustomError";

// Define the Like schema
const likeSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    relateId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    isComment: {
      type: Number,
      require: true,
      enum: [0, 1], // 0 for post, 1 for comment
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

likeSchema.pre("save", async function (next) {
  try {
    const { userId, collection, relateId, isComment } = this;
    const alreadyLikes = await collection.findOne({ userId, relateId });

    if (alreadyLikes) {
      await collection.deleteOne({ userId, relateId });
      next(new CustomError(200, "the like are deleted"));
    }

    // Check the type of relateId (Post or Comment)
    if (isComment) {
      // Check if isComment is 1 for Comment
      let commentExist = await Comment.findById(relateId);

      if (!commentExist) {
        return next(new CustomError(404, "No comment found with this Id."));
      }
      commentExist;
    } else {
      // Check if isComment is 0 for Post
      let postExist = await Post.findById(relateId);

      if (!postExist) {
        return next(new CustomError(404, "No post found with this Id."));
      }

      await Post.findByIdAndUpdate(relateId, {
        $inc: { likesCount: 1 },
      });
    }
  } catch (err) {
    next(new CustomError(500, "Error from the server, try again later."));
  }
});

// Create the Like model from the schema
const Like = mongoose.model("Like", likeSchema);

export default Like;
