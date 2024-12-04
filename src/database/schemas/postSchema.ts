import mongoose, { Schema } from "mongoose";
import User from "./userSchema";
import { NextFunction } from "express";
import IPost from "../../interfaces/PostDataInterface";

// Define the Post schema
const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Number, // The ID of the category the post belongs to
      default: 0,
      required: true,
    },
    petId: {
      type: Schema.Types.ObjectId,
      ref: "Pet",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
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
