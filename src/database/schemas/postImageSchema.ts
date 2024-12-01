import mongoose, { Schema } from "mongoose";


// Define the PostImage schema
const postImageSchema = new Schema(
  {
    // imageId: {
    //   type: Number, // Store imageId as a number
    //   required: true,
    //   unique: true, // Ensures no duplicate imageId
    // },
    postId: {
      type: String, // The ID of the associated post
      required: true,
    },
    imageUrl: {
      type: String, // The URL of the image
      required: true,
    }
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the PostImage model from the schema
const PostImage = mongoose.model('PostImage', postImageSchema);

export default PostImage;
