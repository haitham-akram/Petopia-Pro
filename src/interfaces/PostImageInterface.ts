import { Document, Schema } from "mongoose";

interface IPostImage extends Document {
  postId: string; // The ID of the associated post
  imageUrl: string; // The URL of the image
}

export default IPostImage;
