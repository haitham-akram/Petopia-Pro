import { getPublicConnection } from "../../../queries/connections";
import { sendNotifToPublicRoom } from "../../events";

async function sendNewPostNotif(actorName: string, userId: string, dataHeader: string) {
    const roomId = await getPublicConnection(userId)
    sendNotifToPublicRoom({ messageType: 'new-post', actorName, roomId: roomId as string, dataHeader })
}

export default sendNewPostNotif