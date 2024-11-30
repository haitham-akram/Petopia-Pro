import mongoose, { Schema } from "mongoose";

// Define the Notfication schema
const notficationSchema = new Schema(
  {
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

// Create the Notfication model from the schema
const Notfication = mongoose.model("Notfication", notficationSchema);

export default Notfication;
