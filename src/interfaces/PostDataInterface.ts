import { Document, Schema } from "mongoose";

interface IPost extends Document {
  userId: Schema.Types.ObjectId; // Reference to the User model
  categoryId: number; // The ID of the category the post belongs to
  postContent: string; // Content of the post
  isHaveImg: boolean; // Whether the post has an image
  likesCount: number; // Number of likes on the post
  commentsCount: number; // Number of comments on the post
}

export default IPost;
