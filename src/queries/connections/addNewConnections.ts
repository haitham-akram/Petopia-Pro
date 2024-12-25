import { Types } from "mongoose";
import Connection from "../../database/schemas/connectionSchema";

async function addNewConnection(
  userId: Types.ObjectId | string,
  newRooms: string[]
) {
  return await Connection.findOneAndUpdate(
    { userId },
    { $push: { rooms: newRooms } },
    { upsert: true, }
  );
}

export default addNewConnection;
