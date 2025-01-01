import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: Number,
      required: true,
      enum:[0,1,2,3]
    }, // Notification type: "like", "comment", etc.
    data: { type: Object },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
