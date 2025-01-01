import { Types } from "mongoose";
import UserConnectRooms from "../../database/schemas/userConnectRoomsSchema";

async function removeConnection(
  userId: Types.ObjectId | string,
  roomId?: string
) {
  return await UserConnectRooms.findOneAndUpdate(
    { userId },
    { $pull: { rooms: roomId } },
    // { upsert: true, }
  );
}

export default removeConnection;
