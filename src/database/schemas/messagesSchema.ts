import mongoose, { Schema } from "mongoose";

// Define the Messages schema
const messagesSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    resiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    postId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      require: true,
    },
    content:{
      type: String,
      require: true, 
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Messages model from the schema
const Messages = mongoose.model("Messages", messagesSchema);

export default Messages;
