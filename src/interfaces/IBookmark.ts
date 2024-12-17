import mongoose from "mongoose";

// Define the Bookmark interface
export interface IBookmark extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    marked_posts: {
        postId: mongoose.Schema.Types.ObjectId;
    }[];
}