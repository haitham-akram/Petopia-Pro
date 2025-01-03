import { Types } from "mongoose";
import UserConnectRooms from "../../database/schemas/userConnectRoomsSchema";

async function connectUserRooms(
    userId: Types.ObjectId | string,
) {
    return (await UserConnectRooms.findOne({ userId }).select("-_id rooms"))?.rooms || [];
}

export default connectUserRooms;
