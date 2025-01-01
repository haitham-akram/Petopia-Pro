import mongoose, { Schema } from "mongoose";
import { sendMessageEvent } from "../../socket/events";
import CustomError from "../../helpers/CustomError";

// Define the Messages schema
const messagesSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    reciverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    messageRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MessagesRoom",
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    attachedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: ""
    },
  },
  {
    timestamps: true, // Automatically handle createdAt and updatedAt
  }
);

messagesSchema.pre("save", async function (next) {
  try {
    const messageSentCheck = await sendMessageEvent(this.senderId!.toString(), this.reciverId!.toString(), "Hello", this.attachedId)

    if (!messageSentCheck) next(new CustomError(404, "somthing went wrong"))

    next()
  } catch (err) {
    throw new CustomError(404, "somthing went wrong")
  }
  next()
})

// Create the Messages model from the schema
const Message = mongoose.model("Message", messagesSchema);

export default Message;
