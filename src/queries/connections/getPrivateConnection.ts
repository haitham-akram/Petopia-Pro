import { Types } from "mongoose";
import Connection from "../../database/schemas/connectionSchema";

async function getPrivateConnection(
    userId: Types.ObjectId | string,
) {
    const privateRoom = (await Connection.findOne({ userId }))?.privateRoom
    return privateRoom
}

export default getPrivateConnection;
