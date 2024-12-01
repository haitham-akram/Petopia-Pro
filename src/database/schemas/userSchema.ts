import mongoose, { Schema } from "mongoose";


// Define the User schema
const userSchema = new Schema(
  {
    fullName: {
      type: String, // Full name of the user
      required: true,
    },
    email: {
      type: String, // Email of the user
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String, // The user's password
      required: true,
    },
    userImage: {
      type: String, // URL or path to the user's image
    },
    profileImage: {
      type: String, // URL or path to the user's profile image
    },
    address: {
      type: String, // Address of the user
    },
    phone: {
      type: String, // User's phone number
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String, // Status of the user (active or disActive)
      enum: ['active', 'disActive'], // Enum validation for status
      default: 'active',
      required: true,
    },
    followerCount: {
      type: Number, // Number of followers
      default: 0,
      required: true,
    },
    followingCount: {
      type: Number, // Number of people the user is following
      default: 0,
      required: true,
    }
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

export default  User;
