import { Document, Schema } from "mongoose";

interface IPostImage extends Document {
//   imageId: number; // Store imageId as a number
  postId: string; // The ID of the associated post
  imageUrl: string; // The URL of the image
}

export default IPostImage;
