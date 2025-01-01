import { Types } from "mongoose";
import MessagesRoom from "../../database/schemas/messagesRoomSchema";
import CustomError from "../../helpers/CustomError";

async function createNewMR(userNum1Id: Types.ObjectId | string, userNum2Id: Types.ObjectId | string,) {
    if (userNum1Id === userNum2Id) return new CustomError(400, "Somthing went wrong.")
    const newMessageRoom = new MessagesRoom({ usersId: [userNum1Id.toString(), userNum2Id.toString()].sort() });
    return await newMessageRoom.save()
}

export default createNewMR