import { Types } from "mongoose";
import Connection from "../../database/schemas/connectionSchema";

async function getPublicConnection(
    userId: Types.ObjectId | string,
) {
    const publicRoom = (await Connection.findOne({ userId }))?.publicRoom
    return publicRoom
}

export default getPublicConnection;
