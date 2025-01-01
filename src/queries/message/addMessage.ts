import { Types } from "mongoose";
import Message from "../../database/schemas/messagesSchema";

async function addNewMessage(messageInfo: { senderId: Types.ObjectId | string, reciverId: Types.ObjectId | string, messageRoom: Types.ObjectId | string, content: string, attachedId?: string }) {
    const newMessage = new Message(messageInfo);
    return await newMessage.save();
}

export default addNewMessage;
