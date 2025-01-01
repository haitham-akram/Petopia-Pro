import { Types } from "mongoose";
import MessagesRoom from "../../database/schemas/messagesRoomSchema";

async function getOneMR(userId: Types.ObjectId | string, otherUserId: Types.ObjectId | string,) {
    const usersIdOriginal = [userId.toString(), otherUserId.toString()].sort();;

    let messageRoom = await MessagesRoom.findOne({ usersId: { $eq: usersIdOriginal } })
    return messageRoom?.roomId;
}

export default getOneMR