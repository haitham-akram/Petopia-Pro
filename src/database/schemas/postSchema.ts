import mongoose, { Schema } from "mongoose";

// Define the Post schema
const postSchema = new Schema(
  {
    // postId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Pet",
    //   required: true,
    // },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categoryId: {
      type: Number, // The ID of the category the post belongs to
      required: true,
    },
    postContent: {
      type: String, // Content of the post
      required: true,
    },
    isHaveImg: {
      type: Boolean, // Whether the post has an image or not
      required: true,
    },
    likesCount: {
      type: Number, // Number of likes on the post
      default: 0, // Default value is 0
    },
    commentsCount: {
      type: Number, // Number of comments on the post
      default: 0, // Default value is 0
    }
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Post model from the schema
const Post = mongoose.model('Post', postSchema);

export default Post;
