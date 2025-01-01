import { getPublicConnection } from "../../../queries/connections";
import { sendNotifToPublicRoom } from "../../events";

async function sendNewCommentNotif(actorName: string, userId: string, dataHeader: string) {
    const roomId = await getPublicConnection(userId)
    sendNotifToPublicRoom({ messageType: 'new-comment', actorName, roomId: roomId as string, dataHeader })
}

export default sendNewCommentNotif