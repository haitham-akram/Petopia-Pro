import { Types } from "mongoose";
import UserConnectRooms from "../../database/schemas/userConnectRoomsSchema";

async function getPrivateConnection(
    userId: Types.ObjectId | string,
) {
    const privateRoom = (await UserConnectRooms.findOne({ userId }).select("-_id privateRoom"))?.privateRoom
    return privateRoom
}

export default getPrivateConnection;
