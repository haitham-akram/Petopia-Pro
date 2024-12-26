import mongoose, { Schema, Types } from "mongoose";

const userConnectRoomsSchema = new Schema(
  {
    // the user that have the connection info
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // the private channel that are made to notify the user about the the follower or other notification that just about the user.
    privateRoom: {
      type: String,
      required: true,
      unique: true,
    },
    // the public room that followers use to take any notification of the user like new post or comments.
    publicRoom: {
      type: String,
      required: true,
      unique: true,
    },
    // the channels that the user keep in touch with like the followings and messages
    rooms: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserConnectRooms = mongoose.model("UserConnectRooms", userConnectRoomsSchema);

export default UserConnectRooms;
