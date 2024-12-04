import mongoose, { Schema } from "mongoose";

// Define the adminEmail schema
const adminEmailSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    timestamps: true,
  }
);

// Create the adminEmail model from the schema
const AdminEmail = mongoose.model("AdminEmail", adminEmailSchema);

export default AdminEmail;
