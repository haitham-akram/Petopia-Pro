import { Types } from "mongoose";
import UserConnectRooms from "../../database/schemas/userConnectRoomsSchema";

async function addNewConnection(
  userId: Types.ObjectId | string,
  newRooms?: string[] | string
) {
  return await UserConnectRooms.findOneAndUpdate(
    { userId },
    { $push: { rooms: newRooms || [] } },
    // { upsert: true, }
  );
}

export default addNewConnection;
