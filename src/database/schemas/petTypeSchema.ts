import mongoose, { Schema } from "mongoose";


// Define the PetType schema
const petTypeSchema = new Schema(
  {
    _Id: {
      type: Number, // Store typeId as a number
      required: true,
      unique: true, // Ensures no duplicate typeId
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

// Create the PetType model from the schema
const PetType = mongoose.model('PetType', petTypeSchema);

export default PetType;
