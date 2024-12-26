import { Types } from "mongoose";
import Connection from "../../database/schemas/connectionSchema";
import UserConnectRooms from "../../database/schemas/userConnectRoomsSchema";

async function addNewConnection(
  userId: Types.ObjectId | string,
  newRooms: string[]
) {
  return await UserConnectRooms.findOneAndUpdate(
    { userId },
    { $push: { rooms: newRooms } },
    // { upsert: true, }
  );
}

export default addNewConnection;
