import mongoose, { Schema } from "mongoose";

// Define the UserPreferences schema
const userPreferences = new Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    preferances: {
      pref: {
        type: Object, // The user ID
        required: true,
        unique: true, // Ensures no duplicate followId
      },
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the UserPreferences model from the schema
const UserPreferences = mongoose.model("UserPreferences", userPreferences);

export default UserPreferences;
