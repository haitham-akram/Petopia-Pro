import mongoose, { Schema } from "mongoose";

// Define the Category schema
const categorySchema = new Schema(
  {
    _id: {
      type: Number, // Store categoryId as a number
      required: true,
      unique: true, // Ensures no duplicate categoryId
    },
    title: {
      type: String, // Store title as a string
      required: true, // Make title required
    }
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Category model from the schema
const Category = mongoose.model('Category', categorySchema);

export default Category;
