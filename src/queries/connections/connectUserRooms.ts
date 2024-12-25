import { Types } from "mongoose";
import Connection from "../../database/schemas/connectionSchema";

async function connectUserRooms(
    userId: Types.ObjectId | string,
) {
    return (await Connection.findOne({ userId }).select(" -privateRoom -publicRoom rooms"))!.rooms.push(userId.toString());
}

export default connectUserRooms;
