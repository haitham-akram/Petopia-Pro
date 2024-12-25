import { getPrivateConnection } from "../../../queries/connections";
import { sendNotifToPrivateRoom } from "../../events";
// import { sendNotifToPublicRoom } from "../../events";

async function newFollowerNotif(actorName: string, userId: string) {
    const roomId = await getPrivateConnection(userId)
    console.log(roomId)
    sendNotifToPrivateRoom({ messageType: 'new-follower', actorName, roomId: roomId as string, })
}

export default newFollowerNotif