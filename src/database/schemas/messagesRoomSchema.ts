import mongoose, { Schema, Types } from "mongoose";

// Define the MessagesRoom schema
const messagesRoomSchema = new Schema(
    {
        usersId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true,
        }],
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            default: new Types.ObjectId()
        },
        status: {
            type: Number,
            enum: [0, 1,], // 0: disabled, 1: enabled;
            default: 1
        }
    },
    {
        timestamps: true, // Automatically handle createdAt and updatedAt
    }
);


// Unique index
messagesRoomSchema.index({ roomId: 1 }, { unique: true });

// Create the MessagesRooms model from the schema
const MessagesRoom = mongoose.model("MessagesRoom", messagesRoomSchema);

export default MessagesRoom;
