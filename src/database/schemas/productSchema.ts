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
    stock: {
      type: Number, // Stock of the product in the storage
      required: true,
      default: 1,
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

// productSchema.pre("save", async function (next) {
//   try {
//     const { stock } = this;

//     if (stock < 0 || stock > 21) {
//       next(new CustomError(200, "The stock value must be between 1 and 20."));
//     }

//     next();
//   } catch (error) {
//     next(new CustomError(500, "somthing went wrong, try again later."));
//   }
// });

// Create the Product model from the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
