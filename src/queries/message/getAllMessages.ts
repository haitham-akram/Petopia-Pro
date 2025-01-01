import { Types } from "mongoose";
import Message from "../../database/schemas/messagesSchema";

async function getAllMessages(userId: Types.ObjectId | string, messageRoom: Types.ObjectId | string, index?: string, count?: string) {
    const indexNum = Number(index) || 0;
    const countNum = Number(count) || 15;

    const roomMessages = await Message.aggregate([
        {
            $match: {
                $or: [
                    { senderId: new Types.ObjectId(userId) },
                    { reciverId: new Types.ObjectId(userId) },
                ],
                messageRoom: new Types.ObjectId(messageRoom)
            }
        },
        {
            $sort: { createdAt: 1 }
        },
        {
            $skip: indexNum * countNum
        },
        {
            $limit: countNum
        },
        {
            $lookup: {
                from: "Post",
                localField: "attachedId",
                foreignField: "_id",
                as: "attachedPostDetails"
            }
        },
        {
            $lookup: {
                from: "Product",
                localField: "attachedId",
                foreignField: "_id",
                as: "attachedProductDetails"
            }
        },
    ]);

    return roomMessages;
}

export default getAllMessages;