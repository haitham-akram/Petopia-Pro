import { Types } from "mongoose";
import Connection from "../../database/schemas/connectionSchema";
import UserConnectRooms from "../../database/schemas/userConnectRoomsSchema";

async function getPublicConnection(
    userId: Types.ObjectId | string,
) {
    const publicRoom = (await UserConnectRooms.findOne({ userId }).select("-_id publicRoom"))?.publicRoom
    return publicRoom
}

export default getPublicConnection;
