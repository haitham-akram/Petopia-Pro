import { Types } from "mongoose";
import MessagesRoom from "../../database/schemas/messagesRoomSchema";

async function getAllMR(userId: Types.ObjectId | string) {
    const newMessageRoom = await MessagesRoom.aggregate([
        {
            $match: {
                $or: [
                    { senderId: new Types.ObjectId(userId) },
                    { reciverId: new Types.ObjectId(userId) },
                ]
            }
        }
    ])
    return newMessageRoom
}

export default getAllMR