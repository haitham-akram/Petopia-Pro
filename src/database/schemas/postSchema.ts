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
    likesCount: {
      type: Number, // Number of likes on the post
      default: 0, // Default value is 0
    },
    commentsCount: {
      type: Number, // Number of comments on the post
      default: 0, // Default value is 0
    },
    images: [
      {
        url: {
          type: String, // Image Url
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Post model from the schema
const Post = mongoose.model("Post", postSchema);

export default Post;
