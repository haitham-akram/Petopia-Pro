import { Types } from "mongoose";
import MessagesRoom from "../../database/schemas/messagesRoomSchema";

async function deleteMR(roomId: Types.ObjectId) {
    const deletedMessageRoom = await MessagesRoom.deleteOne(
        { roomId, }
    )
    return deletedMessageRoom
}

export default deleteMR