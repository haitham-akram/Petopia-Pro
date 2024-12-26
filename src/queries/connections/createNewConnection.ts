import { Types } from "mongoose";

// import Connection from "../../database/schemas/connectionSchema";
import UserConnectRooms from "../../database/schemas/userConnectRoomsSchema";

async function createNewConnection(
    userId: Types.ObjectId | string
) {
    const privateRoom = (new Types.ObjectId()).toString()
    const publicRoom = (new Types.ObjectId()).toString()

    const newConnection = new UserConnectRooms({ userId, privateRoom, publicRoom, rooms: [] })

    try {
        return await newConnection.save()
    } catch (err: any) {
        if (err.code == 11000) {
            return newConnection
        }
        return err
    }
}

export default createNewConnection;
