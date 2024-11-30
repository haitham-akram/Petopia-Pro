import mongoose, { Schema } from "mongoose";

// Define the Logging schema
const loggingSchema = new Schema(
  {
    header: {
      type: String,
      reqier: true,
    },
    contant: {
      type: String,
      reqier: true,
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Logging model from the schema
const Logging = mongoose.model("Logging", loggingSchema);

export default Logging;
