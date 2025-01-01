import { Types } from "mongoose";
import { io } from "../config";
import eventsTypes from "../eventsTypes";
import { getOneMR } from "../../queries/messagesRoom";

async function sendMessageEvent(senderId: Types.ObjectId | string, reciverId: Types.ObjectId | string, text: string, attachedId?: Types.ObjectId | string) {
    let messageRoom = await getOneMR(senderId, reciverId);

    if (!messageRoom) return false;

    const message = { text, attachedId }

    io.to(messageRoom.toString()).emit(eventsTypes.SEND_PRIVATE_MESSAGE[1], message);

    return true;
}

export default sendMessageEvent