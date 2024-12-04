const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Pet schema
const petSchema = new Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    petName: {
      type: String, // Name of the pet
      required: true,
    },
    type: {
      type: Number, // Numeric value for pet type (e.g., 1 for dog, 2 for cat)
      required: true,
    },
    age: {
      type: Number, // Age of the pet
      required: true,
    },
    gender: {
      type: String, // Gender of the pet
      required: true,
    },
    healthStatus: {
      type: String, // Health status of the pet
      required: true,
    },
    adoptionStatus: {
      type: String, // Adoption status of the pet (e.g., available, adopted)
      required: true,
    }
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the Pet model from the schema
const Pet = mongoose.model('Pet', petSchema);

export default Pet;
