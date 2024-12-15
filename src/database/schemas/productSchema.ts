import mongoose, { Schema } from "mongoose";

// Define the Product schema
const productSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // refer user id
      ref: "User",
      require: true,
    },
    title: {
      type: String, // Title of the product
      required: true,
    },
    price: {
      type: Number, // Price of the product
      required: true,
    },
    details: {
      type: String, // Detailed description of the product
      required: true,
    },
    rating: {
      type: Number, // Rating of the product (e.g., from 1 to 5)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Product model from the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
